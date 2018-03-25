
function test() {
    console.log('---进入background.js-----');
    alert("test");
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")//判断是否为要处理的消息
        {
            play();
            sendResponse({ farewell: "goodbye" });

        }

    });


function play() {
    var myAuto = document.getElementById('myaudio');
    myAuto.play();
}
