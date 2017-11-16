import UserInfoModalTpl from './user.info.modal.pug';

/**
 * Users linked in markdown will get highlighted with this.
 *
 * @param $compile
 * @param $uibModal
 * @param $rootScope
 * @param {AuthService} AuthService
 * @ngInject
 */
export default function userDetails($compile, $uibModal, $rootScope, AuthService) {
	return {
		restrict: 'E',
		link: function(scope, element) {
			$rootScope.$on('user', function() {
				if (AuthService.hasPermission('users/view')) {
					element.addClass('a');
				} else {
					element.removeClass('a');
				}
			});
			if (AuthService.hasPermission('users/view')) {
				element.addClass('a');
			}
			element.click(function() {
				if (AuthService.hasPermission('users/view')) {
					$uibModal.open({
						templateUrl: UserInfoModalTpl,
						controller: 'UserInfoModalCtrl',
						controllerAs: 'vm',
						resolve: {
							username: function() {
								return element.html();
							}
						}
					});
				}
			});
		}
	};
}