const widgetContainer = document.getElementById("widget-container");
function buy(store) {
    let bank = parseInt(score.innerHTML);
    let cost = store.getAttribute("cost");
    console.log(`bank: [${bank}] cost[${cost}]`);
    
    if (bank < cost) return;

    changeScore(-1 * cost);

    var widget = document.createElement("div");
    widget.setAttribute("durability", store.getAttribute("durability"));
    console.log(widget.getAttribute("durability"));
    widget.classList.add("widget");
    fillWidget(store, widget);
    widget.onclick = () => {
        harvest(widget);
    }
    widgetContainer.appendChild(widget);
    if(widget.getAttribute("auto") == 'true') harvest(widget);
}

function harvest(widget) {
    // Only run if currently not harvesting
    if (widget.hasAttribute("harvesting")) return;
    // Set harvesting flag
    widget.setAttribute("harvesting", "");
    widget.setAttribute("durability", parseInt(widget.getAttribute("durability")) - 1)
    if (parseInt(widget.getAttribute("durability")) === 0) {
        widget.remove();
        return;
    }
    // If manual, collect points now
    if (widget.getAttribute("auto") != 'true') {
        changeScore(widget.getAttribute("reap"));
        showPoint(widget);
    }

    setTimeout(() => {
        // Remove the harvesting flag
        widget.removeAttribute("harvesting");
        // If automatic, collect points
        if (widget.getAttribute("auto") == 'true') {
            changeScore(widget.getAttribute("reap"));
            showPoint(widget);
            harvest(widget);
        }
    }, parseFloat(widget.getAttribute("cooldown")) * 1000);
}

function changeScore(amount) {
    score.innerHTML = parseInt(score.innerHTML) + parseInt(amount);

    let bank = parseInt(score.innerHTML);
    // Update the stores to block buying expensive boxes
    for(let store of stores) {
        console.log(store);
        let cost = parseInt(store.getAttribute("cost"));
        if (bank < cost) {
            store.setAttribute("broke", "")
        }
        else {
            store.removeAttribute("broke");
        }
    }
    
}

function showPoint(widget) {
    let number = document.createElement("span");
    number.className = "point";
    number.innerHTML = "+" + widget.getAttribute("reap");
    number.style.left = "50%";
    number.style.top = "50%";
    number.onanimationend = () => {
        widget.removeChild(number);
    }
    widget.appendChild(number);
}