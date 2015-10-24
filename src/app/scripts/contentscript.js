/*
 * Copy As Markdown.
 *
 * User: Johnny Fee
 * Date: 2014-01-29
 * Time: 23:41:10
 * Contact: djohnnyfee@gmail.com
 */

'use strict';

(function () {
    'use strict';

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function escapeRegExp(string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    function replaceAll(string, find, replace) {
        return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    function getProductDetail() {
        var productName = $('#productName').val();
        var content = replaceAll(template, '#productName#', productName);

        var productKeyword = $('#productKeyword').val();
        content = replaceAll(content, '#productKeyword#', productKeyword);

        var keywords2 = $('#keywords2').val();
        var keywords3 = $('#keywords3').val();
        var moreKeywords = '';
        if (keywords2) {
            moreKeywords = ', ' + keywords2;
        }

        if (keywords3) {
            moreKeywords += ', ' + keywords3;
        }
        content = replaceAll(content, '#moreKeywords#', moreKeywords);

        var productKeywordTitleCase = toTitleCase(productKeyword);
        content = replaceAll(content, '#productKeywordTitleCase#', productKeywordTitleCase);

        // 型号
        var modelNumber = $('input[name="sysAttrValueIdAndValue3"]').val();
        content = replaceAll(content, '#modelNumber#', modelNumber);

        // 颜色
        var color = $('[value="Color"]').next().val();
        content = replaceAll(content, '#color#', color);

        // Size
        var size = $('[value="Size(inch)"]').next().val();
        content = replaceAll(content, '#size#', size);

        // Material
        var material = $('[value="Material"]').next().val();
        content = replaceAll(content, '#material#', material);

        return content;
    }

    function productName2TitleCase() {
        var productName = $('#productName').val();
        productName = toTitleCase(productName)
        $('#productName').val(productName);
    }

    function sendToBackgrond(content) {

    }

    // 收取后台页面的消息。
    chrome.runtime.onMessage.addListener(function onMessage(request, sender, sendResponse) {
        // 收到的消息指令为
        if (request.action === 'A-D') {
            // 准备 Product 内容
            var content = getProductDetail();

            // 让后台将内容拷贝到剪切板。
            chrome.runtime.sendMessage({
                action: 'copytoclipboard',
                content: content
            }, function (response) {
                if (response.success) {
                    sendResponse({
                        sucess: true
                    });
                }
            });
        } else if (request.action === 'A-T') {
            // 准备 Product 内容
            productName2TitleCase();
        }

    });
})();
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
