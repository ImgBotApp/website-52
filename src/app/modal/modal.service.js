import { defaults } from 'lodash';

const ModalQuestionTpl = require('./modal.question.pug')();
const ModalMarkdownTpl = require('./modal.markdown.doc.pug')();
const ModalErrorInfoTpl = require('./modal.error.info.pug')();

export default class ModalService {

	constructor($uibModal) {
		this.$uibModal = $uibModal;

		this._flashMessage = null;
	}

	/**
	 * Displays an error dialog.
	 * @param {object} data Scope variables. Properties:
	 *     <li> `icon`: title bar icon, default "warning"
	 *     <li> `title`: title in dialog bar, default ""
	 *     <li> `subtitle`: body title
	 *     <li> `message`: body message
	 *     <li> `close`: text of the close button
	 * @param {boolean} [flash] If true, the dialog isn't displayed instantly but on the next page.
	 */
	error(data, flash) {
		return this._modal(data, { icon: 'warning', title: 'Ooops!', close: 'Close' }, flash);
	}


	/**
	 * Displays an error dialog.
	 * @param {object} data Scope variables. Properties:
	 *     <li> `icon`: title bar icon, default "info"
	 *     <li> `title`: title in dialog bar
	 *     <li> `subtitle`: body title
	 *     <li> `message`: body message
	 *     <li> `close`: text of the close button, default "close".
	 * @param {boolean} [flash] If true, the dialog isn't displayed instantly but on the next page.
	 */
	info(data, flash) {
		return this._modal(data, { icon: 'info', close: 'Close' }, flash);
	}

	markdown() {
		return this.$uibModal.open({
			template: ModalMarkdownTpl,
			controller: 'ModalCtrl',
			resolve: { data: () => null },
			size: 'lg'
		});
	}


	/**
	 * Displays a question dialog.
	 * @param {object} data Scope variables. Properties:
	 *     <li> `icon`: title bar icon, default "question-circle"
	 *     <li> `title`: title in dialog bar
	 *     <li> `message`: message before the question
	 *     <li> `question`: question (centered)
	 *     <li> `yes`: text of the yes button, default "Yes"
	 *     <li> `no`: text of the no button, default "No"
	 */
	question(data) {
		const deflt = {
			icon: 'question-circle',
			yes: 'Yes',
			no: 'No'
		};
		data = defaults(data, deflt);

		return this.$uibModal.open({
			template: ModalQuestionTpl,
			controller: 'ModalCtrl',
			controllerAs: 'vm',
			resolve: { data: () => data }
		});
	}


	/**
	 * Displays a simple dialog.
	 * @see #error
	 * @see #info
	 * @param {object} data Scope variables under `data`.
	 * @param {object} defaultValues Default scope variables
	 * @param {boolean} flash If true, the dialog isn't displayed instantly but on the next page.
	 * @private
	 */
	_modal(data, defaultValues, flash) {

		data = defaults(data, defaultValues);
		if (flash) {
			this._flashMessage = data;
		} else {
			// if connection broke and the html isn't cached, this will fail too
			try {
				return this.$uibModal.open({
					template: ModalErrorInfoTpl,
					controller: 'ModalCtrl',
					resolve: { data: () => data }
				});
			} catch (err) {
				console.error(err);
			}
		}
	}
}
