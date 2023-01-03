let inpColor = document.querySelector("#fontColor");
let buttonChange = document.querySelector("#buttonChange");

let color = "";


inpColor.addEventListener("change", () => {
    color = inpColor.value;
    // console.log(color);
});

buttonChange.addEventListener("click", (event) => {
    // console.log(color);
    chrome.tabs.query({active: true,currentWindow: true}, function (tabs) {
        console.log(color);
        chrome.tabs.sendMessage(tabs[0].id, {todo: "changeColor", clickedColor: color });
    });

});

