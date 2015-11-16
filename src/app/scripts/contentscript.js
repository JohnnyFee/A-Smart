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
    var myWords = {'running belts': 2};

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function escapeRegExp(string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    function replaceAll(string, find, replace) {
        return string.replace(new RegExp(find, 'g'), replace);
    }

    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function (sub) {
            return this.length >= sub.length && this.substring(this.length - sub.length) == sub;
        };
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
        color = replaceAll(color, ' or Customized', '');
        content = replaceAll(content, '#color#', color);

        // Size
        var $sizeAttr = $('[value="Size(inch)"]');
        var size = '';
        if ($sizeAttr.length !== 0) {
            size = $sizeAttr.next().val();
        }

        // Size
        var $capacity = $('[value="Capacity"]');
        var capacity = '';
        if ($capacity.length !== 0) {
            capacity = $capacity.next().val();
        }
        content = replaceAll(content, '#capacity#', capacity);

        var $largeSize = $('[value="Large Size(inch)"]');
        var $mediumSize = $('[value="Medium Size(inch)"]');
        var $smallSize = $('[value="Small Size(inch)"]');

        if ($largeSize.length !== 0) {
            size = "Large Size: " + $largeSize.next().val();
        }

        if ($mediumSize.length !== 0) {
            size += "<br>Medium Size: " + $mediumSize.next().val();
        }

        if ($smallSize.length !== 0) {
            size += "<br>Small Size: " + $smallSize.next().val();
        }

        content = replaceAll(content, '#size#', size);

        // 样品费
        var sampleFee = '0';

        // 内链
        var fullCategory = $.trim($('#cate-path-text-copy').text());
        var category = fullCategory.substring(fullCategory.lastIndexOf('>>') + 2);
        var link = '';
        var type = $('[name="sysAttrValueIdAndValue351"] option:selected').text();
        var occasion = $('[name="sysAttrValueIdAndValue970"] option:selected').text();

        switch (category) {
            case 'Waist Bags':
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802402172/Waist_Bags.html">Waist Bags</a>';
                var sampleFee = '50';
                break;
            case 'Diaper Bags':
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802382860/Diaper_Bags.html">Diaper Bags</a>';
                sampleFee = '70';
                break;
            case 'Cooler Bags':{
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802270605/Cooler_Lunch_Bags.html">Cooler & Lunch Bags</a>';
                sampleFee = '50';
                break;
            }
            case 'Cosmetic Bags & Cases':{
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802277003/Cosmetic_Bags.html">Cosmetic Bags & Cases</a>';
                sampleFee = '50';
                break;
            }
            case 'Messenger Bags':
            {
                if (productName.indexOf('Sling') > -1) {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802355734/Sling_Bags.html">Sling Bags</a>';
                    sampleFee = '60';
                } else {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802343028/Shoulder_Bags.html">Shoulder Bags</a>';
                    sampleFee = '70';
                }

                break;
            }
            case 'Laptop Bags':
            {
                if (type === 'Laptop Backpack') {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802414215/Laptop_Backpacks.html">Laptop Backpacks</a>';
                    sampleFee = '80';
                }
                break;
            }
            case 'Backpacks':
            {

                if (occasion === 'Camping & Hiking') {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802407312/Outdoor_Backpacks.html">Outdoor Backpacks</a>';
                    sampleFee = '90';
                } else {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802301819/Daypacks.html">Daypacks</a>';
                    sampleFee = '70';
                }
                break;
            }
            case 'School Bags':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802361982/School_Backpacks.html">School Backpacks</a>';
                sampleFee = '70';
                break;
            }

        }

        content = replaceAll(content, '#categoryLink#', link);
        content = replaceAll(content, '#sampleFee#', sampleFee);

        // Material
        var material = $('[value="Material"]').next().val();
        //var material1 = $('[name="sysAttrValueIdAndValue10"] option:selected').text();
        //if (material1 && material1 !== material) {
        //    material += ', ' + material1;
        //}

        content = replaceAll(content, '#material#', material);

        return content;
    }

    /**
     * 修改页面属性。
     */
    function modifyProperties() {
        // 产品名称 Title Case
        var productName = $('#productName').val();
        productName = toTitleCase(productName);
        $('#productName').val(productName);

        var productKeyword = $('#productKeyword').val();
        var productKeywordTitleCase = toTitleCase(productKeyword);

        $('[value="Product Name"]').next().val(productName);

        var $style = $('[value="Style"]');
        var $type = $('[value="Type"]');
        var $usage = $('[value="Usage"]');
        var $itemName = $('[value="Item Name"]');

        if ($style.length !== 0) {
            $style.next().val(productKeywordTitleCase);
        }

        if ($type.length !== 0) {
            $type.next().val(productKeywordTitleCase);
        }

        if ($usage.length !== 0) {
            $usage.next().val(productKeywordTitleCase);
        }

        if ($itemName.length !== 0) {
            $itemName.next().val(productKeywordTitleCase);
        }

        // 修改包装
        $('#packagingDesc').val('1 ' + productKeyword + ' in OPP bag; 20 pieces in one master carton.');
    }

    function clickMyProducts() {
        // 转到阿里首页
        var location = window.location.href;

        switch (location) {
            case 'http://www.alibaba.com':
            {
                // 输入关键词
                $('.ui-searchbar-keyword').val('running belt');

                // 点击搜索
                $('.ui-searchbar-submit')[1].click();
            }
        }



        $('div.item-grid:contains("Yiwu Inesoi Bag Factory")').find('.item-col').find('a').click();
    }

    // 收取后台页面的消息。
    chrome.runtime.onMessage.addListener(function onMessage(request, sender, sendResponse) {
        // 收到的消息指令为
        if (request.action === 'A-D') {
            // 准备 Product 内容
            var content = getProductDetail();

            var $productContent = $('textarea[wrap="soft"]');
            $productContent.val(content);

            // 让后台将内容拷贝到剪切板。
            //chrome.runtime.sendMessage({
            //    action: 'copytoclipboard',
            //    content: content
            //}, function (response) {
            //    if (response.success) {
            //        sendResponse({
            //            sucess: true
            //        });
            //    }
            //});
        } else if (request.action === 'A-T') {
            // 准备 Product 内容
            modifyProperties();
        } else if (request.action === 'A-I') {
            // 修改产品详情中图片的 ALT 属性。

            var pName = $('#productName').val();

            var $productContent = $('textarea[wrap="soft"]');
            var productContent = $productContent.val();

            var alt = 'alt="' + pName + '"';
            var modifiedContent = replaceAll(productContent, 'alt=".*?"', alt);
            $productContent.val(modifiedContent);
        } else if (request.action === 'A-Click') {
            clickMyProducts();
        }
    });
})();
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
//# sourceMappingURL=contentscript.js.map
