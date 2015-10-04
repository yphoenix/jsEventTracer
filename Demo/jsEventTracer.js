/**
 * @package jsEventTrace
 * @subpackage JS
 * @author Yorick Phoenix <yphoenix@scribblings.com>
 * @copyright Copyright (c) 2015 Yorick Phoenix, All Rights Reserved
 */

/*eslint quotes:0, no-console:0, no-mixed-spaces-and-tabs: 0, no-multi-spaces: 0 */
/*globals console, window, $ */

var jsEventTrace = {jQuery: true, logLevel: 2};

// http://www.w3schools.com/jsref/dom_obj_event.asp

jsEventTrace.eventLevels    = [];
jsEventTrace.eventLevels[0] = [];
jsEventTrace.eventLevels[1] = ['change', 'input', 'click', 'keydown', 'keypress', 'keyup', 'select', 'reset', 'submit'];
jsEventTrace.eventLevels[2] = ['blur', 'focus', 'focusin', 'focusout',
							   'mousedown', 'mouseup', 'dblclick'];
jsEventTrace.eventLevels[3] = ['abort', 'error',  'invalid',
							   'load', 'beforeunload', 'unload',
							   'hashchange',
							   'pageshow', 'pagehide', 'resize', 'scroll',
							   'online', 'offline',
							   'contextmenu', 'show',
							   'copy', 'cut', 'paste',
							   'toggle',
							   'beforeprint', 'afterprint',
							   'storage'];
jsEventTrace.eventLevels[4] = ['mouseeover', 'mouseenter', 'mousemove', 'mouseleave', 'mouseout',
							   'mousewheel', 'wheel',
							   'dragenter', 'dragover', 'dragstart', 'drag', 'dragend', 'dragleave', 'drop',
							   'touchstart', 'touchmove', 'touchend', 'touchcancel'];

/**
 * Display an event in the console
 *
 * @param {Event} evt	  - Event to be logged
 * @param {Event} origEvt - Original Event, if jQuery Event model used
 */

jsEventTrace.logEvent =
	function(evt, origEvt)
	{
		'use strict';

		console.log(evt.timeStamp, evt.type, origEvt, evt.target);
	};

/**
 * Event Handler for all events that we are tracing
 *
 * @param {Event} evt
 */

jsEventTrace.trace =
	function(evt)
	{
		'use strict';
		var logLevel, origEvt;

		origEvt = evt;

		if (jsEventTrace.jQuery && evt.originalEvent && evt.originalEvent.type)
		{
			origEvt = evt.originalEvent;
		}

		// ['focus', 'focusin', 'mousedown', 'mouseup', 'click'].indexOf(evt.type) === -1

		logLevel = jsEventTrace.logLevel;

		while (logLevel > 0)
		{
			if (jsEventTrace.eventLevels[logLevel] &&
				jsEventTrace.eventLevels[logLevel].indexOf(evt.type) !== -1)
			{
				jsEventTrace.logEvent(evt, origEvt);
				break;
			}

			logLevel--;
		}
	};

/**
 * Event Tracer Initialization
 */

jsEventTrace.init =
	function()
	{
		'use strict';
		var evts, eventList;

		eventList = '';

		jsEventTrace.eventLevels.forEach(
			function BuildEventList(events)
			{
				eventList += events.join(' ') + ' ';
			}
		);

		evts = eventList.split(' ');

		if (jsEventTrace.jQuery &&
			typeof jQuery !== 'function')
		{
			jsEventTrace.jQuery = false;

			console.warn('jsEventTrace jQuery support disabled, jQuery unavailable');
		}

		if (jsEventTrace.jQuery)
		{
			$(window).on(evts.join(' '), jsEventTrace.trace);
		}
		else
		{
			evts.forEach(
				function AddListener(evt)
				{
					if (evt !== '')
					{
						window.addEventListener(evt, jsEventTrace.trace, true);
					}
				});
		}
	};

jsEventTrace.init();
