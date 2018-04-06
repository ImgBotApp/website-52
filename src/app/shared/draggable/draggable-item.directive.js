/*
 * VPDB - Virtual Pinball Database
 * Copyright (C) 2018 freezy <freezy@vpdb.io>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */
import Draggabilly from 'draggabilly';

/**
 * Override this not to switch to position after drag, because the element
 * will never end up at the exact dragged location anyway (either jumps back
 * to origin or gets added to destination).
 */
Draggabilly.prototype.dragEnd = function(event, pointer) {
	if (!this.isEnabled) {
		return;
	}
	this.element.classList.remove('is-dragging');
	this.dispatchEvent('dragEnd', event, [pointer]);
};

/**
 * The editor with markdown preview.
 * @ngInject
 */
export default function($parse, DraggableService) {
	return {
		restrict: 'A',
		scope: true,
		link: function(scope, element, attrs) {
			console.log('directive loaded.', element[0]);
			const draggie = new Draggabilly(element[0], {});

			draggie.on('dragStart', () => {
				const getData = $parse(attrs['draggableData']);
				DraggableService.startDrag(attrs['draggableItem'], element, {
					data: attrs['draggableData'] ? getData(element.scope()) : undefined,
					animateDuration: attrs['draggableAnimateDuration'] ? parseInt(attrs['draggableAnimateDuration']) : 0
				});
				element.css('pointer-events', 'none');
			});
			draggie.on('dragEnd', () => {
				DraggableService.stopDrag(attrs['draggableItem'], element);
				element.css('pointer-events', 'all');
			});
		}
	};
}
