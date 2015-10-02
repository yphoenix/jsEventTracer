/**
 * @package 8 Puzzle
 * @subpackage JS
 * @author Yorick Phoenix <yphoenix@scribblings.com>
 * @copyright Copyright (c) 2015 Yorick Phoenix, All Rights Reserved
 */

/*eslint quotes:0, no-console:0, no-mixed-spaces-and-tabs: 0, no-multi-spaces: 0 */
/*globals console, document $ */
/*globals jsEventTrace */

jsEventTrace.logEvent =
	function CustomLogEvent(evt, origEvt)
	{
		'use strict';
		var str, lastStamp;

		console.log(evt.timeStamp, evt.type, origEvt, evt.target);

		if (evt.target.id !== 'console' &&
			$('#screenlog').prop('checked'))
		{
			str = '';

			lastStamp = CustomLogEvent.stamp === undefined ? 0 : CustomLogEvent.stamp;

			if (evt.timeStamp > 0 &&
				evt.timeStamp - lastStamp > 200)
			{
				str += '-------------<br>';
			}

			str += evt.timeStamp + ' ' + evt.type + ' ' + evt.target.type;

			switch (evt.type)
			{
				case'keypress':
					str += ' [' + evt.charCode + '/' + String.fromCharCode(evt.charCode) + ']';
					break;

				case'keyup':
				case'keydown':
					str += ' [' + evt.keyCode + ']';
					break;
			}

			str += '<br>';

			$('#console').append(str);
			$('#console')[0].scrollTop += 10000;

			if (evt.timeStamp > 0)
			{
				CustomLogEvent.stamp = evt.timeStamp;
			}
		}
	};

$(document).ready(
	function DocumentReady()
	{
		'use strict';
		var mouseEvents;

		$('#menu').change(
			function MenuChanged()
			{
				jsEventTrace.logLevel = $('#menu').val();
			}
		);

		mouseEvents = ['mousedown', 'mouseup', 'dblclick',
					   'mouseeover', 'mouseenter', 'mousemove', 'mouseleave', 'mouseout',
					   'mousewheel', 'wheel',
					   'dragenter', 'dragover', 'dragstart', 'drag', 'dragend', 'dragleave', 'drop',
					   'touchstart', 'touchmove', 'touchend', 'touchcancel'];

		$('#mouseAround').on(mouseEvents.join(' '),
			function DisplayMouseEvent(evt)
			{
				['clientX', 'clientY',
				 'offsetX', 'offsetY',
				 'pageX',	'pageY',
				 'screenX', 'screenY'].forEach(
					function DisplayValue(val)
					{
						 $('#' + val).html(evt[val]);
					});
			});
	}
);
