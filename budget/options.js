let saveLimit = document.querySelector("#saveLimit");
let inpLimit = document.querySelector("#limit");
let resetTotal = document.querySelector("#resetTotal");

chrome.storage.sync.get("limit", function (obj) {
    inpLimit.value = obj.limit;
});

saveLimit.addEventListener("click", () => {
    chrome.storage.sync.set({"limit": inpLimit.value}, () => {
        close();
    });
});

resetTotal.addEventListener("click", () => {
    chrome.storage.sync.set({"total": 0});
    let notifications = {
        type: "basic",
        iconUrl: "icon48.png",
        title: "Spending Reset",
        message: "Total Spending reset to Zero!"
    }
    chrome.notifications.create("resetNotif", notifications);
});

