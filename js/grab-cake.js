function grabCake() {


    console.log('----grapCake now');

    // 轮询
    var timer = setInterval(function () {

        chrome.storage.local.get('distance', function (valueArray) {
            console.log(valueArray);
        });
        var arrBuy = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
        arrBuy.forEach(ele => {
            var no = document.querySelectorAll('li.buy')[ele].childNodes[0].outerText;
            var cny = document.querySelectorAll('li.buy')[ele].childNodes[1].outerText;
            var btc = document.querySelectorAll('li.buy')[ele].childNodes[2].outerText;
            var amount = document.querySelectorAll('li.buy')[ele].childNodes[3].outerText;
            var man = document.querySelectorAll('li.buy')[ele].childNodes[4].outerText;
            var buyItem = { "no": no, "cny": cny, "btc": btc, "amount": amount, "man": man }
            console.log(buyItem);
        });

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

chrome.runtime.sendMessage({ "greeting": "hello" },
    function (response) {
        console.log("bg log responsed:" + response.farewell);
    })


grabCake();
