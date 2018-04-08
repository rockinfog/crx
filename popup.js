// 先获取background页面
var bg = chrome.extension.getBackgroundPage();
//再在返回的对象上调用background.js 里面的函数
//bg.test();


chrome.storage.local.get('distance', function (store) {
    if(store&& store.distance);
    {
        document.getElementById('distance').value=store.distance;
    }
});


document.getElementById("btnSubmit").onclick = function () {
    var distance = document.getElementById('distance').value;
    chrome.storage.local.set({ 'distance': distance }, function () {
        console.log('存储成功');
    });
    chrome.storage.local.set({ 'cnt': 0 }, function () {
        console.log('存储成功');
    });

    
}

