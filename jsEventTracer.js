/**
 * @package jsEventTrace
 * @subpackage JS
 * @author Yorick Phoenix <yphoenix@scribblings.com>
 * @copyright Copyright (c) 2015 Yorick Phoenix, All Rights Reserved
 */

/*eslint quotes:0, no-console:0 */
/*globals console, window, $ */

var jsEventTrace = {jQuery: true};

jsEventTrace.trace =
	function(evt)
	{
		'use strict';

		if (evt.originalEvent && evt.originalEvent.type)
		{
			evt = evt.originalEvent;
		}

		// ['focus', 'focusin', 'mousedown', 'mouseup', 'click'].indexOf(evt.type) === -1

		console.log(evt.timeStamp, evt.type, evt, evt.target);
	};

jsEventTrace.init =
	function()
	{
		'use strict';
		var evts;

		// http://www.w3schools.com/jsref/dom_obj_event.asp

		evts = ['abort', 'error',
				'load', 'beforeunload', 'unload',
				'hashchange',
				'pageshow', 'pagehide', 'resize', 'scroll',
				'online', 'offline',
				'blur', 'change', 'focus', 'focusin', 'focusout', 'input', 'invalid',
				'reset', 'search', 'select', 'submit',
//				'moveover', 'mouseenter', 'mousemove', 'mouseleave', 'mouseout',
				'mousedown', 'mouseup', 'click', 'dblclick',
				'mousewheel', 'wheel',
				'touchstart', 'touchmove', 'touchend', 'touchcancel',
				'contextmenu', 'show',
				'keydown', 'keypress', 'keyup',
				'dragenter', 'dragover', 'dragstart', 'drag', 'dragend', 'dragleave', 'drop',
				'copy', 'cut', 'paste',
				'toggle',
				'beforeprint', 'afterprint',
				'storage'];

		if (jsEventTrace.jQuery)
		{
			$(window).on(evts.join(' '), jsEventTrace.trace);
		}
		else
		{
			evts.forEach(
				function AddListener(evt)
				{
					window.addEventListener(evt, jsEventTrace.trace, true);
				});
		}
	};

jsEventTrace.init();
