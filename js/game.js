import { playSound } from "./audio.js";

let html = document.getElementById("html");
let counter = document.getElementById("counter");
let multiplierDisplay = document.getElementById("multiplier");
let cookieButton = document.getElementById("cookie");
let cookiesDiv = document.getElementById("cookies");
let upgradeButton = document.getElementById("upgrade");
let rebirthDisplay = document.getElementById("rebirthDisplay");
let rebirthButton = document.getElementById("rebirth");

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

let cookies = 0;
let multiplier = 1;
let cost = 10;
let costMultiplier = 1;

cookieButton.addEventListener("click", clickCookie);

export function clickCookie(sound = true) {
    if (sound) playSound("audio/button.wav");

    cookies += multiplier;
    updateCounter();
    setCookies(cookies);
    checkUpgrade();
    counter.animate(numberAnim, animLength);

    if (cookies >= rebirthCost) {
        rebirthButton.hidden = false;
    }
    else {
        rebirthButton.hidden = true;
    }
}

upgradeButton.addEventListener("click", function () {

    if (cookies >= cost) {
        playSound("audio/upgrade.wav");

        cookies -= cost;
        updateCounter();
        setCookies(cookies);

        multiplier *= 2 + (rebirth - 1);

        multiplierDisplay.animate(numberAnim, animLength);
        costMultiplier += 0.8;
        cost = Math.round(cost * costMultiplier);
        updateMultiplier();
        checkUpgrade();
    }
    else {
        playSound("audio/button.wav");
    }
})

rebirthButton.addEventListener("click", function() {
    if (cookies >= rebirthCost) {
        playSound("audio/rebirth.wav");
        startRebirth();
    }
    else {
        playSound("audio/button.wav");
    }
});

function checkUpgrade() {
    if (cookies >= cost) {
        upgradeButton.className = "button-ready"
    }
    else {
        upgradeButton.className = "button"
    }
}

function updateCounter() {
    counter.innerText = `Cookies: ${numberToWord(cookies)}`;
}

function updateMultiplier() {
    multiplierDisplay.innerText = `Multiplier: ${numberToWord(multiplier)}`;
    upgradeButton.innerText = `Upgrade multiplier to ${numberToWord(multiplier * (2 + (rebirth - 1)))}:\n${numberToWord(cost)} cookies`;
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
    rebirthCost *= 10000000;
    rebirthDisplay.innerText = `Rebirth ${rebirth}`;
    rebirthDisplay.hidden = false;
    rebirthButton.hidden = true;

    updateMultiplier();
    checkUpgrade();

    setBackground(rebirth);
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
        if (count < 1000000000000000000000000) img.className = `fakecookie-${cookieScale}`;
        else img.className = "fakecookie-infinity";
        img.src = "cookie.png";
        cookiesDiv.appendChild(img);
    }
}

function clearCookies() {
    while (cookiesDiv.childElementCount > 0) {
        cookiesDiv.removeChild(cookiesDiv.firstChild);
    }
}

function numberToWord(number) {
    if (number < 1000) return number;

    var divisions = 0;

    while (number > 10) {
        if (number / 1000 > 1) {
            number /= 1000;
            divisions++;
        }
        else break;
    }

    var word = number.toFixed(2).toString();

    while (divisions > 0) {
        if (divisions == 1) {
            word += " thousand"
            divisions -= 1;
        }
        else if (divisions == 2) {
            word += " million"
            divisions -= 2;
        }
        else if (divisions == 3) {
            word += " billion"
            divisions -= 3;
        }
        else if (divisions == 4) {
            word += " trillion"
            divisions -= 4;
        }
        else if (divisions == 5) {
            word += " quadrillion"
            divisions -= 5;
        }
        else if (divisions == 6) {
            word += " quintillion"
            divisions -= 6;
        }
        else if (divisions == 7) {
            word += " sextillion"
            divisions -= 7;
        }
        else if (divisions == 8) {
            word += " septillion"
            divisions -= 8;
        }
        else if (divisions == 9) {
            word += " octillion"
            divisions -= 9;
        }
        else if (divisions >= 10) {
            word += " decillion"
            divisions -= 10;
        }
    }

    return word;
}