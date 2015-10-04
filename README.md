# jsEventTracer
Debugging Tool for Tracing JS Events

Support for IE9 and newer, Edge, FireFox, Chrome, Safari, WebKit, etc

Demo <a href="http://yphoenix.github.io/jsEventTracer/Demo/Demo.html">Located Here</a>

Will use jQuery if it is available, otherwise the standard DOM Event Handler.

To disable jQuery use, load before jQuery or define jsEventTrace.jQuery = false;

You can change the logLevel with jsEventTrace.logLevel = newLevel;

Setting the logLevel to 0 will disable all tracing

You can write your own event display handler by overwriting jsEventTrace.logEvent, see the Demo for an example
