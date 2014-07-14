ctrl.controller('GameController', function($scope, $http, $routeParams, $modal, $log) {

	$scope.theme('dark');
	$scope.setMenu('games');

	$scope.gameId = $routeParams.id;
	$scope.pageLoading = true;

	$scope.accordeon = {
		isFirstOpen: true
	};

	$http({
		method: 'GET',
		url: '/api-mock/games/' + $scope.gameId

	}).success(function(data, status, headers, config) {
		var game = data.result;
		game.lastrelease = new Date(game.lastrelease).getTime();

		$scope.game = game;
		setTimeout(function() {
			$('.image-link').magnificPopup({
				type: 'image',
				removalDelay: 300,
				mainClass: 'mfp-fade'
			});
		}, 0);
		$scope.pageLoading = false;
	});

	$scope.requestModPermission = function(release) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/modals/requestModPermission',
			controller: 'RequestModPermissionModalCtrl'
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});


ctrl.controller('RequestModPermissionModalCtrl', function($scope, $modalInstance) {

	$scope.ok = function () {
		$modalInstance.close(true);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss(false);
	};
});

ctrl.controller('AdminGameAddCtrl', function($scope, $upload, $modal, ApiHelper, IpdbResource, GameResource) {

	var maxAspectRatioDifference = 0.2;
	var dropText = 'Drop backglass image here';
	var uploadText = 'Uploading...';

	$scope.theme('light');
	$scope.setMenu('admin');

	$scope.idValidated = false;

	$scope.reset = function() {
		$scope.game = {
			origin: 'recreation',
			media: {}
		};
		$scope.ipdbUrl = '';
		$scope.backglass = {};
		$scope.uploadedBackglass = false;
		$scope.uploadedLogo = false;
		$scope.errors = {};
		$scope.error = null;
		$scope.backglassUploadText = dropText;
		$scope.logoUploadText = dropText;
		$scope.backglassUploadProgress = 0;
		$scope.logoUploadProgress = 0;
	};

	var fetchIpdb = function(ipdbId, done) {
		$scope.setLoading(true);
		var game = IpdbResource.get({ id: ipdbId }, function() {
			$scope.setLoading(false);

			$scope.game = _.extend($scope.game, game);
			if ($scope.game.short) {
				$scope.game.gameId = $scope.game.short[0].replace(/[^a-z0-9\s\-]+/gi, '').replace(/\s+/g, '-').toLowerCase();
			} else {
				$scope.game.gameId = $scope.game.name.replace(/[^a-z0-9\s\-]+/gi, '').replace(/\s+/g, '-').toLowerCase();
			}
			if (done) {
				done(null, $scope.game);
			}
		}, ApiHelper.handleErrorsInDialog($scope, 'Error fetching data.'));
	};

	var readIpdbId = function() {
		if (/id=\d+/i.test($scope.ipdbUrl)) {
			var m = $scope.ipdbUrl.match(/id=(\d+)/i);
			return m[1];

		} else if (parseInt($scope.ipdbUrl)) {
			return $scope.ipdbUrl;
		} else {
			return false;
		}
	};

	$scope.refresh = function(done) {

		var ipdbId = readIpdbId();
		if (ipdbId) {
			fetchIpdb(ipdbId, done);
		} else {
			$modal.open({
				templateUrl: 'partials/modals/info',
				controller: 'InfoModalCtrl',
				resolve: {
					icon: function() { return 'fa-warning'; },
					title: function() { return 'IPDB Fetch'; },
					subtitle: function() { return 'Sorry!'; },
					message: function() { return 'You need to put either the IPDB number or the URL with an ID.'; }
				}
			});
		}
	};

	$scope.check = function() {

		if (!$scope.game.gameId) {
			$scope.idValid = false;
			$scope.idValidated = true;
			return;
		}

		GameResource.head({ id: $scope.game.gameId }, function() {
			$scope.idValid = false;
			$scope.idValidated = true;
		}, function() {
			$scope.idValid = true;
			$scope.idValidated = true;
		})
	};

	$scope.submit = function() {

		var submit = function() {

			$scope.game.gameType =
					$scope.game.origin == 'originalGame' ? 'og' : (
					$scope.game.gameType ? $scope.game.gameType.toLowerCase() : 'na'
				);

			var game = GameResource.save($scope.game, function() {
				$scope.reset();
				$modal.open({
					templateUrl: 'partials/modals/info',
					controller: 'InfoModalCtrl',
					resolve: {
						icon: function() { return 'fa-check-circle-o'; },
						title: function() { return 'Game Created!'; },
						subtitle: function() { return game.title; },
						message: function() { return 'The game has been successfully created.'; }
					}
				});
			}, ApiHelper.handleErrors($scope));
		};

		// if not yet refreshed, do that first.
		var ipdbId = readIpdbId();
		if ($scope.game.origin == 'recreation' && ipdbId && (!$scope.game.ipdb || !$scope.game.ipdb.number)) {
			fetchIpdb(ipdbId, submit);
		} else {
			submit();
		}
	};

	var onImageUpload = function(type, done) {
		var cType = type.charAt(0).toUpperCase() + type.slice(1);
		return function($files) {
			var file = $files[0];

			// check for image mime type
			if (!_.contains(['image/jpeg', 'image/png'], file.type)) {
				return $modal.open({
					templateUrl: 'partials/modals/info',
					controller: 'InfoModalCtrl',
					resolve: {
						icon: function() { return 'fa-file-image-o'; },
						title: function() { return 'Image Upload'; },
						subtitle: function() { return 'Wrong file type!'; },
						message: function() { return 'Please upload a JPEG or PNG image.'; }
					}
				});
			}

			// upload image
			var fileReader = new FileReader();
			fileReader.readAsArrayBuffer(file);
			fileReader.onload = function(event) {
				$scope['uploaded' + cType] = false;
				$scope[type + 'Uploading'] = true;
				$scope[type + 'UploadText'] = uploadText;
				console.log(file);
				$upload.http({
					url: '/api/files',
					method: 'PUT',
					params: { type: type },
					headers: {
						'Content-Type': file.type,
						'Content-Disposition': 'attachment; filename="' + file.name + '"'
					},
					data: event.target.result
				}).then(function(response) {
					$scope[type + 'Uploading'] = false;
					$scope[type + 'UploadText'] = dropText;
					done(response);
				}, ApiHelper.handleErrorsInDialog($scope, 'Error uploading image.'), function (evt) {
						$scope[type + 'UploadProgress'] = parseInt(100.0 * evt.loaded / evt.total);
				});
			};
		};
	};

	$scope.onBackglassUpload = onImageUpload('backglass', function(response) {

		var bg = response.data;
		$scope.uploadedBackglass = bg.variations.small;
		$scope.game.media.backglass = bg._id;

		var ar = Math.round(bg.metadata.size.width / bg.metadata.size.height * 1000) / 1000;
		var arDiff = Math.abs(ar / 1.25 - 1);

		$scope.backglass = {
			dimensions: bg.metadata.size.width + '×' + bg.metadata.size.height,
			test: ar == 1.25 ? 'optimal' : (arDiff < maxAspectRatioDifference ? 'warning' : 'error'),
			ar: ar,
			arDiff: Math.round(arDiff * 100)
		};
	});

	$scope.onLogoUpload = onImageUpload('logo', function(response) {

		var bg = response.data;
		$scope.uploadedLogo = bg.url;
		$scope.game.media.logo = bg._id;

	});


	$scope.reset();
});