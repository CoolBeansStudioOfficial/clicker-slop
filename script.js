let counter = document.getElementById("counter");
let multiplierDisplay = document.getElementById("multiplier");
let cookie = document.getElementById("cookie");
let cookiesDiv = document.getElementById("cookies");
let upgradeButton = document.getElementById("upgrade");
let rebirthDisplay = document.getElementById("rebirthDisplay");
let rebirthButton = document.getElementById("rebirth");

let cookies = 0;
let multiplier = 1;
let cost = 10;
let costMultiplier = 1;

let numberAnim = [
    { rotate: "0deg" },
    { rotate: "-10deg" },
    { rotate: "10deg" },
    { rotate: "0deg" },
]

let animLength = {
    duration: 100,
    iterations: 1,
}

cookie.addEventListener("click", function() {
    cookies += multiplier;
    updateCounter();
    setCookies(cookies);
    checkUpgrade();
    counter.animate(numberAnim, animLength);

    if (cookies >= rebirthCost) rebirthButton.hidden = false;
});

upgradeButton.addEventListener("click", function() {
    if (cookies >= cost) {
        cookies -= cost;
        updateCounter();
        setCookies(cookies);

        multiplier *= 2 + (rebirth - 1);
        
        multiplierDisplay.animate(numberAnim, animLength);
        costMultiplier += 0.2;
        cost = Math.round(cost * costMultiplier);
        updateMultiplier();
        checkUpgrade();
    }
})

rebirthButton.addEventListener("click", function() {
    if (cookies >= rebirthCost) startRebirth();
});

function checkUpgrade() {
    if (cookies >= cost) {
        upgradeButton.className = "upgrade-ready"
    }
    else {
        upgradeButton.className = "upgrade"
    }
}

function updateCounter() {
    counter.innerText = `Cookies: ${cookies}`;
}

function updateMultiplier() {
    multiplierDisplay.innerText = `Multiplier: ${multiplier}x`;
    upgradeButton.innerText = `Upgrade to ${multiplier * (2 + (rebirth - 1))}x: ${cost} cookies`;
}

let rebirth = 1;
let rebirthCost = 1000000;

function startRebirth() {
    //reset stats
    cookies = 0;
    multiplier = 1;
    cost = 10;
    costMultiplier = 1;
    updateCounter();
    setCookies(cookies);

    rebirth++;
    rebirthCost *= 1000;
    rebirthDisplay.innerText = `Rebirth ${rebirth}`;
    rebirthDisplay.hidden = false;
    rebirthButton.hidden = true;

    updateMultiplier();
    checkUpgrade();
}

function setCookies(count) {
    clearCookies();
    var cookieScale = 1;

    var lengthFound = false;
    while (!lengthFound) {
        if (count - (cookieScale * 100) < 1) {
            lengthFound = true;
        }
        else { cookieScale *= 100 }
    }

    for (var i = 0; i < count / cookieScale; i++) {
        var img = document.createElement("img");
        if (count < 10000000000000000) img.className = `fakecookie-${cookieScale}`;
        else img.className = "fakecookie-infinity";
        img.src = "golden.png";
        cookiesDiv.appendChild(img);
    }
}

function clearCookies() {
    while (cookiesDiv.childElementCount > 0) {
        cookiesDiv.removeChild(cookiesDiv.firstChild);
    }
}