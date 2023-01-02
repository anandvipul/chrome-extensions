let spent = document.querySelector("#spendAmount");
let limit = document.querySelector("#limit");
let total = document.querySelector("#total");
let inpAmt = document.querySelector("#amount");

chrome.storage.sync.get("total", function (budget) {
    total.innerText = budget.total;
});

chrome.storage.sync.get("limit", function (obj) {
    limit.innerText = obj.limit;
});

spent.addEventListener("click", () => {
    chrome.storage.sync.get(["total", "limit"], function (budget) {
        let newTotal = 0;
        if (budget.total) {
            newTotal += parseInt(budget.total);
        }

        let amount = inpAmt.value;
        if (amount) {
            newTotal += parseInt(amount);
        }

        chrome.storage.sync.set({"total": newTotal}, function (obj) {
            if (amount && newTotal >= budget.limit) {
                let notifications = {
                    type: "basic",
                    iconUrl: "icon48.png",
                    title: "Llimit reached",
                    message: "Oh! You have reached your specified limit"
                }
                chrome.notifications.create("limitNotif", notifications);
            }
        });

        total.innerText = newTotal;
        inpAmt.innerText = "";
    });
});