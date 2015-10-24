/*
 * Copy As Markdown.
 *
 * User: Johnny Fee
 * Date: 2014-01-29
 * Time: 23:41:10
 * Contact: djohnnyfee@gmail.com
 */


(function () {
  'use strict';

  function prepareDetail(){
      console.log('==============');
  }

  // Listen for the content script to send a message to the background page.
  // 收取后台页面的消息。
  chrome.runtime.onMessage.addListener(function onMessage(request, sender, sendResponse) {
    // 收到的消息指令为
    if (request.action !== 'A-D') {
      return;
    }

    // 准备 Product 内容
    var content = prepareDetail();

    // 让后台将内容拷贝到剪切板。
    chrome.runtime.sendMessage({
      action: 'copytoclipboard',
      content: content
    }, function (response) {
      if (response.success) {
        sendResponse({
          sucess: true
        });
        return;
      }
    });

    sendResponse({
      sucess: true
    });
  });
}());
