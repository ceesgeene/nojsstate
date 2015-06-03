# pagestate

Using the CSS target: pseudo selector it is possible to apply style variations based upon the fragment identifier of the
URI of a HTML document.

A benefit of using the fragment identifier of the URI to set a web page into a specific state (like showing a sidebar)
is that it adds a record to the browser's history; users can use the back-button of the browser to return to the
previous state.

A problem is however that it adds a record every time the fragment identifier changes. Opening and
closing the sidebar multiple times will add an equal amount of records to the browser history. Using the browser's
back-button will also open and close the sidebar as many times.

Pagestate.js ensures that only the last browser history record is a "page state".
