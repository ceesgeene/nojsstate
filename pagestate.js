(function (window, location, history) {
    'use strict';

    window.addEventListener("hashchange", onHashchange);
    window.addEventListener("click", onClick);

    var pageHistory = false;

    function onHashchange() {
        pageHistory = true;

        // Prevent scrolling to top of page.
        if (location.hash === "") {
            return false;
        }
    }

    function onClick(event) {
        // No need to continue if the window"s location isn"t going to be updated.
        if (event.defaultPrevented) {
            return;
        }

        var target = event.target;
        // Find closest link element.
        while (target.tagName !== "A" && target !== document.body) {
            target = parent.parentNode;
        }
        // Stop early if target is not a link or page has no state.
        if (target.tagName !== "A" || location.hash.substr(0, 7) !== "#state-") {
            return;
        }
        var linkHashPos = target.href.indexOf("#");
        // Stop if link has no hash.
        if (linkHashPos === -1) {
            return;
        }
        var windowUrl = location.href,
            windowHashPos = windowUrl.indexOf("#"),
            windowUrlWithoutHash = windowUrl.substr(0, windowHashPos !== -1 ? windowHashPos : undefined);
        // Only apply behavior if the link matches the current url (ignoring hashes) and we have page state.
        if (target.href.substr(0, linkHashPos) === windowUrlWithoutHash) {
            event.preventDefault();
            if (target.hash) {
                // Use location.replace() instead of history.replaceState() because the latter does not rematch "target:"
                // pseudo selectors (at least not in webkit https://bugs.webkit.org/show_bug.cgi?id=83490).
                location.replace(target.hash);
            }
            // Empty hash while in page state means we want to remove the state from the history all together.
            else if (pageHistory) {
                history.go(-1);
            }
            // We don"t know whether we can go back in history, so just remove the hash from the url.
            else {
                location.replace("#");
                history.replaceState({}, "", windowUrlWithoutHash)
            }
        }
    }

})(window, location, history);
