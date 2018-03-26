
function test() {
    console.log('---进入background.js-----');
    alert("test");
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.command == "play")//判断是否为要处理的消息
        {
            console.log('play....');
            play();
            sendResponse({ result: "play success" });
        }
        else
        {
            console.log('pause....');
            pause();
            sendResponse({ result: "pause success" });
        }

    });


function play() {
    var myAuto = document.getElementById('myaudio');
    myAuto.play();
}


function pause() {
    var myAuto = document.getElementById('myaudio');
    myAuto.pause();
}
