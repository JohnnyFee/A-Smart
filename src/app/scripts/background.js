(function () {
  'use strict';

  /**
   * ���ı����������а塣
   *
   * @param text ��Ҫ�������ı���
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
   * ��ǰ̨����ָ�
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
        // ���ͳɹ���
        console.log(response);
      });
    });
  };

  /**
   * ���������չͼ��ĵ���¼���
   */
  chrome.browserAction.onClicked.addListener(function (tab) {
    // No tabs or host permissions needed!
    console.log('Turning ' + tab.url + ' red!');

    requestHtml2Mardown();
  });

  /**
   * ��ǰ̨���ݵ���Ϣ������
   */
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    // �õ�ǰ̨����ָ�
    if (request.action === 'copytoclipboard') {
      copyToClipboard(request.content);
      // ���ͽ��
      sendResponse({
        success: true
      });
    }
  });

  // �յ����
  chrome.commands.onCommand.addListener(function (command) {
    console.log('Received Command:' + command);
    // �յ�������Ϊ A-D ʱ��
    if (command === 'A-D') {

      // ��ǰ̨����ָ�
      sendADCommand();
    }
  });


}());