const gameRequestModalTpl = require('./request.modal.pug')();

export default class GameSelectModalCtrl {

	/**
	 * Class constructor
	 * @param $uibModal
	 * @param $uibModalInstance
	 * @param {App} App
	 * @param {GameResource} GameResource
	 * @param {{ title:string, text:string }} params
	 */
	constructor($uibModal, $uibModalInstance, App, GameResource, params) {

		this.$uibModal = $uibModal;
		this.$uibModalInstance = $uibModalInstance;
		this.App = App;
		this.GameResource = GameResource;
		this.params = params;
	}

	findGame(val) {
		return this.GameResource.query({ q: val }).$promise;
	}

	gameSelected(item, model) {
		this.$uibModalInstance.close(model);
	}

	requestGame() {
		this.$uibModalInstance.dismiss();
		this.$uibModal.open({
			template: gameRequestModalTpl,
			controller: 'GameRequestModalCtrl',
			controllerAs: 'vm',
		});
	}
}