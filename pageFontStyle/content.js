chrome.runtime.sendMessage({todo: "showPageAction"});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("567");
    if (request.todo == "changeColor"){
        var addColor = '#' + request.clickedColor;  
        let p = document.querySelector("p");
        p.css('color', addColor);
        console.log(request.clickedColor);
    }
});