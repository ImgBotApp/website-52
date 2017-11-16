/**
 * @param $timeout
 * @ngInject
 */
export default function heightAnimation($timeout) {
	return {
		enter: function(element, done) {

			// execute at the end of the stack so angular can finish rendering and we have the correct height
			$timeout(function() {
				const wrapper = element.parents('.ui-view-wrapper');
				const height = element.get(0).offsetHeight + 10;
				wrapper.css('height', height + 'px');
			});

			$timeout(function() {
				const wrapper = element.parents('.ui-view-wrapper').css('height', '');
				done();
			}, 300); // must be the same as the end of the css transformation
		},

		leave: function(element, done) {
			const wrapper = element.parents('.ui-view-wrapper');
			const height = element.get(0).offsetHeight + 10;
			wrapper.css('height', height + 'px');
			done();
		},
		move: function(element, done) { done(); },
		beforeAddClass : function(element, className, done) { done(); },
		addClass : function(element, className, done) { done(); },
		beforeRemoveClass : function(element, className, done) { done(); },
		removeClass : function(element, className, done) { done(); },
		allowCancel : function(element, event, className) {}
	};
}