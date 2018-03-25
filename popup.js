// 先获取background页面
var bg = chrome.extension.getBackgroundPage();
//再在返回的对象上调用background.js 里面的函数
//bg.test();


document.getElementById("btnSubmit").onclick = function () {
    var distance = document.getElementById('distance').value;
    chrome.storage.local.set({'distance': distance}, function() {
        console.log('存储成功') ;      
});
}

