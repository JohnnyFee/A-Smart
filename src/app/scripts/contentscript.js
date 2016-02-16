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

    function isAlibaba() {
        var host = window.location.host;
        if (host === 'hz.productposting.alibaba.com') {
            return true;
        }

        return false;
    }

    function isTactical(productName) {
        return productName.indexOf('Military') > -1 || productName.indexOf('Army') > -1 || productName.indexOf('Tactical') > -1 || productName.indexOf('Molle') > -1;
    }

    function getProductDetail(template) {

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
        } else {
            size = $('input[name="sysAttrValueIdAndValue5"]').val();
        }

        // Size
        var $capacity = $('[value="Capacity"]');
        var capacity = '';
        if ($capacity.length !== 0) {
            capacity = $capacity.next().val();
        }
        content = replaceAll(content, '#capacity#', capacity);

        // Price
        var priceFrom = $('#priceRangeMin').val();
        var priceTo = $('#priceRangeMax').val();
        var price = priceFrom + ' - ' + priceTo;
        content = replaceAll(content, '#price#', price);

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
        var moq = 500;

        // 内链
        var fullCategory = $.trim($('#cate-path-text-copy').text());
        var category = fullCategory.substring(fullCategory.lastIndexOf('>>') + 2);
        var link = '';
        var categoryLink = '';
        var type = $('[name="sysAttrValueIdAndValue351"] option:selected').text();
        var occasion = $('[name="sysAttrValueIdAndValue970"] option:selected').text();
        var quantityPerCarton = 20;
        var sampleFee = '50';

        switch (category) {
            case 'Waist Bags':
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802402172/Waist_Bags.html">Waist Bags</a>';
                categoryLink = '<a title="" href="http://www.inesoi.com/waist-bags/" rel="v:url">Waist Bags</a>';
                sampleFee = '50';
                quantityPerCarton = 100;

                if (isTactical(productName)) {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802812452/Military_Bags.html">Military Bags</a> & <a href="http://inesoi.en.alibaba.com/productgrouplist-802402172/Waist_Bags.html">Waist Bags</a>';
                    sampleFee = '70';
                    quantityPerCarton = 80;
                }
                break;
            case 'Diaper Bags':
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802382860/Diaper_Bags.html">Diaper Bags</a>';
                categoryLink = '<a title="" href="http://www.inesoi.com/diaper-bags/" rel="v:url">Diaper Bags</a>';
                sampleFee = '70';
                quantityPerCarton = 40;
                break;
            case 'Cooler Bags':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802270605/Cooler_Lunch_Bags.html">Cooler & Lunch Bags</a>';
                categoryLink = '<a title="" href="http://www.inesoi.com/cooler-bags/" rel="v:url">Cooler Bags</a>';
                sampleFee = '50';
                quantityPerCarton = 50;
                break;
            }
            case 'Cosmetic Bags & Cases':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802277003/Cosmetic_Bags.html">Cosmetic Bags & Cases</a>';
                sampleFee = '50';
                quantityPerCarton = 80;
                break;
            }
            case 'Messenger Bags':
            {
                if (productName.indexOf('Sling') > -1) {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802355734/Sling_Bags.html">Sling Bags</a>';
                    sampleFee = '60';
                    quantityPerCarton = 60;
                } else {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802343028/Shoulder_Bags.html">Shoulder Bags</a>';
                    sampleFee = '70';
                    quantityPerCarton = 40;
                }

                if (isTactical(productName)) {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802812452/Military_Bags.html">Military Bags</a> & ' +
                    '<a href="http://inesoi.en.alibaba.com/productgrouplist-802343028/Shoulder_Bags.html">Shoulder Bags</a>';
                    sampleFee = '70';
                    quantityPerCarton = 60;
                }


                break;
            }
            case 'Laptop Bags':
            {
                if (type === 'Laptop Backpack') {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802414215/Laptop_Backpacks.html">Laptop Backpacks</a>';
                    sampleFee = '80';
                } else if (type === 'Laptop Sleeve') {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802644068/Laptop_Sleeves.html">Laptop Sleeves</a>';
                    sampleFee = '70';
                    quantityPerCarton = 40;
                }

                break;
            }
            case 'Strollers, Walkers & Carriers':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802396361/Baby_Carriers.html">Baby Carriers</a>';
                sampleFee = '60';
                quantityPerCarton = 50;
                break;
            }
            case 'Backpacks':
            {
                if (occasion === 'Camping & Hiking') {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802407312/Outdoor_Backpacks.html">Outdoor Backpacks</a>';
                    sampleFee = '90';
                    quantityPerCarton = 30;
                } else {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802301819/Daypacks.html">Daypacks</a>';
                    sampleFee = '70';
                    quantityPerCarton = 40;
                }

                if (productName.indexOf('Ski') > -1) {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802550392/Sport_Bags.html">Sport Bags</a>';
                    sampleFee = '80';
                    quantityPerCarton = 30;
                }

                if (isTactical(productName)) {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802812452/Military_Bags.html">Military Bags</a> & <a href="http://inesoi.en.alibaba.com/productgrouplist-802478873/Backpacks.html">Backpacks</a>';
                    sampleFee = '100';
                    quantityPerCarton = 30;
                }

                break;
            }
            case 'School Bags':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802361982/School_Backpacks.html">School Backpacks</a>';
                sampleFee = '70';
                quantityPerCarton = 40;
                break;
            }
            case 'Travel Bags':
            case 'Duffel Bags':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802488977/Duffel_Bags.html">Duffel Bags</a>';
                categoryLink = '<a title="" href="http://www.inesoi.com/duffel-bags/" rel="v:url">Duffel Bags</a>';
                sampleFee = '90';
                quantityPerCarton = 20;

                if (productName.indexOf('Ski') > -1 || productName.indexOf('Snowboard') > -1) {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802550392/Sport_Bags.html">Sport Bags</a>';
                    sampleFee = '120';
                    quantityPerCarton = 10;
                } else if (productName.indexOf('Golf') > -1) {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802556338/Golf_Bags.html">Golf Bags</a>';
                    sampleFee = '70';
                    quantityPerCarton = 20;
                }

                if (isTactical(productName)) {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802812452/Military_Bags.html">Military Bags</a> & ' +
                    '<a href="http://inesoi.en.alibaba.com/productgrouplist-802488977/Duffel_Bags.html">Duffel Bags</a>';
                    sampleFee = '100';
                    quantityPerCarton = 30;
                }

                break;
            }
            case 'Camera, Video Bags':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802618891/Camera_Video_Bags.html">Camera & Video Bags</a>';
                sampleFee = '90';
                quantityPerCarton = 30;
                break;
            }
            case 'Other Sports & Leisure Bags':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802550392/Sport_Bags.html">Sport Bags</a>';
                sampleFee = '120';
                quantityPerCarton = 10;
                break;
            }
            case 'Tool Bag':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802560506/Tool_Bags.html">Tool Bags</a>';
                sampleFee = '100';
                quantityPerCarton = 30;
                break;
            }
            case 'Pet Cages, Carriers & Houses':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802629209/Pet_Carrier.html">Pet Carrier</a>';
                sampleFee = '80';
                quantityPerCarton = 40;
                break;
            }
            case 'Wallets':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802484264/Wallets.html">Wallets</a>';
                sampleFee = '60';
                quantityPerCarton = 80;
                break;
            }
            case 'Golf Bags':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802556338/Golf_Bags.html">Golf Bags</a>';
                sampleFee = '100';
                quantityPerCarton = 20;
                break;
            }
            case 'Sleeping Bags':
            {
                link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802556338/Sleeping_Bags">Sleeping Bags</a>';
                sampleFee = '70';
                quantityPerCarton = 40;
                break;
            }
            case 'Card Holders':
            {
                var cardType = $('[name="sysAttrValueIdAndValue20598"] option:selected').text();
                if (cardType === 'Business Card' || cardType === 'Credit Card') {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802644023/Card_Holders.html">Card Holders</a>';
                    sampleFee = '40';
                    quantityPerCarton = 600;
                } else if (cardType === 'Passport') {
                    link = '<a href="http://inesoi.en.alibaba.com/productgrouplist-802583131/Passport_Holders.html">Passport Holders</a>';
                    sampleFee = '40';
                    quantityPerCarton = 600;
                }

                break;
            }
        }

        content = replaceAll(content, '#categoryLink#', categoryLink);
        content = replaceAll(content, '#link#', link);

        content = replaceAll(content, '#moq#', moq);
        content = replaceAll(content, '#sampleFee#', sampleFee);
        content = replaceAll(content, '#quantityPerCarton#', quantityPerCarton);


        // Material
        var material = $('[value="Material"]').next().val();
        //var material1 = $('[name="sysAttrValueIdAndValue10"] option:selected').text();
        //if (material1 && material1 !== material) {
        //    material += ', ' + material1;
        //}

        content = replaceAll(content, '#material#', material);


        return content;
    }

    function modifyAlibabaProperties() {
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
        var oPackagingDesc = $('#packagingDesc').val();
        var index = oPackagingDesc.indexOf('; ') + 2;
        var packagingDesc = '1 ' + productKeyword + ' in OPP bag; ' + oPackagingDesc.substr(index);
        $('#packagingDesc').val(packagingDesc);
    }

    /**
     * 修改页面属性。
     */
    function modifyProperties() {
        var hostname = window.location.hostname;
        switch (hostname) {
            case 'posting.aliexpress.com':
            {
                modifyExpressProperties();
                break;
            }
            default :
            {
                modifyAlibabaProperties();
            }

        }
        modifyAlibabaProperties();
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
            var content = getProductDetail(templateAlibaba);

            // 让后台将内容拷贝到剪切板。
            var $productContent = $('textarea[wrap="soft"]');
            $productContent.val(content);
        } else if (request.action === 'A-T') {
            // 准备 Product 内容
            modifyProperties();
        } else if (request.action === 'A-I') {
            // 修改产品详情中图片的 ALT 属性。

            var pName = $('#productName').val() || $('#title').val();

            var $productContent = $('textarea[wrap="soft"]') || $('textarea.wp-editor-area');
            var productContent = $productContent.val();

            var alt = 'alt="' + pName + '"';
            var modifiedContent = replaceAll(productContent, 'alt=".*?"', alt);
            $productContent.val(modifiedContent);
        } else if (request.action === 'A-Convert') {
            // 准备 Product 内容
            var content = getProductDetail(templateInesoi);

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
        }
    });
})();
//# sourceMappingURL=contentscript.js.map