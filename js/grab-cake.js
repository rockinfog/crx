var config = {};



function grabCake() {


    console.log('----grapCake now');

    // 轮询
    var timer = setInterval(function () {

        chrome.storage.local.get('distance', function (store) {
            console.log('config distance:' + store.distance);
            config.distance = store.distance;
        });

        var arrIndexBuy = [15, 16, 17, 18, 19];
        var arrBuy = [];
        arrIndexBuy.forEach(ele => {
            var no = document.querySelectorAll('li.buy')[ele].childNodes[0].outerText;
            var cny = document.querySelectorAll('li.buy')[ele].childNodes[1].outerText.replace(/,/g, '');
            var btc = document.querySelectorAll('li.buy')[ele].childNodes[2].outerText;
            var amount = document.querySelectorAll('li.buy')[ele].childNodes[3].outerText.replace(/,/g, '');
            var man = document.querySelectorAll('li.buy')[ele].childNodes[4].outerText;
            var buyItem = { "no": no, "type": "buy", "cny": cny, "btc": btc, "amount": amount, "man": man }
            //console.log(buyItem);
            arrBuy.push(buyItem);
        });
        //console.log(arrBuy);

        var arrIndexSell = [0, 1, 2, 3, 4];
        var arrSell = [];
        arrIndexSell.forEach(ele => {
            var no = document.querySelectorAll('li.sell')[ele].childNodes[0].outerText;
            var cny = document.querySelectorAll('li.sell')[ele].childNodes[1].outerText.replace(/,/g, '');
            var btc = document.querySelectorAll('li.sell')[ele].childNodes[2].outerText;
            var amount = document.querySelectorAll('li.sell')[ele].childNodes[3].outerText.replace(/,/g, '');
            var man = document.querySelectorAll('li.sell')[ele].childNodes[4].outerText;
            var sellItem = { "no": no, "type": "sell", "cny": cny, "btc": btc, "amount": amount, "man": man }
            //console.log(sellItem);
            arrSell.push(sellItem);
        });

        var chajia = parseInt(arrSell[0].cny) - parseInt(arrBuy[arrBuy.length - 1].cny);
        console.log('目前的差价是:' + chajia);
        console.log('配置的差价是:' + config.distance);
        if (parseInt(chajia) > parseInt(config.distance)) {
            console.log('差价出现了');
            chrome.runtime.sendMessage({ "command": "play" },
                function (response) {
                    console.log("bg log responsed:" + response.result);
                });
        }
        else {
            console.log('未达到差价要求');
            chrome.runtime.sendMessage({ "command": "pause" },
                function (response) {
                    console.log("bg log responsed:" + response.result);
                });
        }
        var $btn = document.querySelectorAll('li.buy>span>button')[0];
        //console.log($btn);



        if ($btn) {
            //fireEvent($btn, 'click');
            //clearInterval(timer);
            return;
        }
    }, 2000)
}

var fireEvent = function (element, event) {
    if (document.createEventObject) {
        // IE浏览器支持fireEvent方法
        var evt = document.createEventObject();
        return element.fireEvent('on' + event, evt)
    }
    else {
        // 其他标准浏览器使用dispatchEvent方法
        var evt = document.createEvent('HTMLEvents');
        // initEvent接受3个参数：
        // 事件类型，是否冒泡，是否阻止浏览器的默认行为
        evt.initEvent(event, true, true);
        return !element.dispatchEvent(evt);
    }
};





console.log('-----进入grab------');

grabCake();
