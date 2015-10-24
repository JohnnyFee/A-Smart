(function () {
  'use strict';

  /**
   * 将文本拷贝到剪切板。
   *
   * @param text 将要拷贝的文本。
   */
  var copyToClipboard = function (text) {
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
   * 向前台发送指令。
   */
  var sendADCommand = function () {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      // notify content page to convert html to markdown
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'A-D'
      }, function (response) {
        // 发送成功。
        console.log(response);
      });
    });
  };

  /**
   * 绑定浏览器扩展图标的点击事件。
   */
  chrome.browserAction.onClicked.addListener(function (tab) {
    // No tabs or host permissions needed!
    console.log('Turning ' + tab.url + ' red!');

    requestHtml2Mardown();
  });

  /**
   * 和前台内容的消息交互。
   */
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    // 得到前台拷贝指令。
    if (request.action === 'copytoclipboard') {
      copyToClipboard(request.content);
      // 发送结果
      sendResponse({
        success: true
      });
    }
  });

  // 收到命令。
  chrome.commands.onCommand.addListener(function (command) {
    console.log('Received Command:' + command);
    // 收到的命令为 A-D 时。
    if (command === 'A-D') {

      // 向前台放松指令。
      sendADCommand();
    }
  });


}());