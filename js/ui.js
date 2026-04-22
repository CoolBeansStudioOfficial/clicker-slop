import { numberToWord, cookies, multiplier, multCost, rebirth, rebirthCost } from "./game.js";

let html = document.getElementById("html");
let counter = document.getElementById("counter");
let multiplierDisplay = document.getElementById("multiplier");
let cookiesDiv = document.getElementById("cookies");
let upgradeButton = document.getElementById("upgrade");

//ui updates

export function updateUI() {
    counter.innerText = `Cookies: ${numberToWord(cookies)}`;

    multiplierDisplay.innerText = `Multiplier: ${numberToWord(multiplier)}`;

    setCookies(cookies);

    if (cookies >= multCost) upgradeButton.className = "button-ready";
    else upgradeButton.className = "button";
    upgradeButton.innerText = `Upgrade multiplier to ${numberToWord(multiplier * (2 + (rebirth - 1)))}:\n${numberToWord(multCost)} cookies`;

    if (cookies >= rebirthCost) rebirthButton.hidden = false;
    else rebirthButton.hidden = true;
}

let rebirthDisplay = document.getElementById("rebirthDisplay");
let rebirthButton = document.getElementById("rebirth");

export function updateRebirth() {
    rebirthDisplay.innerText = `Rebirth ${rebirth}`;
    rebirthDisplay.hidden = false;
    rebirthButton.hidden = true;
    setBackground(rebirth);

    updateCounts();
}

function setBackground(number) {
    if (number == 1) {
        html.style = "background: linear-gradient(180deg,rgba(200, 213, 218, 1) 0%, rgba(155, 165, 168, 1) 50%, rgba(200, 213, 218, 1) 100%);"
    }
    else if (number == 2) {
        html.style = "background: linear-gradient(180deg,rgba(200, 213, 218, 1) 0%, rgba(94, 171, 153, 1) 50%, rgba(200, 213, 218, 1) 100%);"
    }
    else if (number == 3) {
        html.style = "background: linear-gradient(180deg,rgba(200, 213, 218, 1) 0%, rgba(194, 188, 79, 1) 50%, rgba(200, 213, 218, 1) 100%);"
    }
    else if (number == 4) {
        html.style = "background: linear-gradient(180deg,rgba(200, 213, 218, 1) 0%, rgba(194, 117, 79, 1) 50%, rgba(200, 213, 218, 1) 100%);"
    }
    else if (number == 5) {
        html.style = "background: linear-gradient(180deg,rgba(200, 213, 218, 1) 0%, rgba(79, 194, 186, 1) 50%, rgba(200, 213, 218, 1) 100%);"
    }
    else {
        html.style = "background: linear-gradient(180deg,rgba(200, 213, 218, 1) 0%, rgba(163, 79, 194, 1) 50%, rgba(200, 213, 218, 1) 100%);"
    }
}

export function setCookies(count) {
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
        if (count < 1000000000000000000000000) img.className = `fakecookie-${cookieScale} fakecookie`;
        else img.className = "fakecookie-infinity fakecookie";
        img.src = "cookie.png";
        cookiesDiv.appendChild(img);
    }
}

function clearCookies() {
    while (cookiesDiv.childElementCount > 0) {
        cookiesDiv.removeChild(cookiesDiv.firstChild);
    }
}