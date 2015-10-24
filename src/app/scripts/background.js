'use strict';

(function () {
    'use strict';

    /**
     * Copy the text to clipboard.
     *
     * @param text copying text.
     */
    var copyToClipboard = function copyToClipboard(text) {
        var copyDiv = document.createElement('textarea');
        copyDiv.id = 'copydiv';

        document.body.appendChild(copyDiv);
        copyDiv.textContent = text;
        copyDiv.focus();
        document.execCommand('SelectAll');
        document.execCommand('copy');
        document.body.removeChild(copyDiv);
    };


    /**
     * Bing Browsr Action Click Event.
     */
    chrome.browserAction.onClicked.addListener(function (tab) {
        // Send A-D command to content page.
        sendCommand('A-D');
    });

    /**
     * Interactive with content page.
     */
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

        // Get the command to Cope to Clipboard.
        if (request.action === 'copytoclipboard') {
            copyToClipboard(request.content);
            // Send response
            sendResponse({
                success: true
            });
        }
    });

    // Receive Command.
    chrome.commands.onCommand.addListener(function (command) {
        /**
         * Send Comand to Content Page.
         */
        var sendCommand = function (action) {

        };

        // Send A-D action to content page.
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: command
            }, function (response) {
                // Send Success
                console.log(response);
            });
        });
    });
})();
//# sourceMappingURL=background.js.map
