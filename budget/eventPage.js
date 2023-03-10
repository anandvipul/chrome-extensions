let contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if (Number.isInteger(+clickData.selectionText)) {
            chrome.storage.sync.get(["total", "limit"], function (budget) {
                let newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);

                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({"total": newTotal}, function () {
                    if (newTotal >= budget.limit) {
                        let notification = {
                            type: "basic",
                            iconUrl: "icon48.png",
                            title: "Limit Reached",
                            message: "The Spend Limit is reached"
                        }
                        chrome.notifications.create("limitNotification", notification);
                    }
                });
            });
        } else {
            
        }
    }
});

chrome.storage.onChanged.addListener(function (changes, storageName) {
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
});