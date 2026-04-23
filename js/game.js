import { playSound } from "./audio.js";
import { updateRebirth, updateUI } from "./ui.js";
import { resetPowerups } from "./powerups.js";

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

export let cookies = 0;
export let multiplier = 1;
export let multCost = 10;
let costMultiplier = 1;

cookieButton.addEventListener("click", clickCookie);

export function clickCookie(sound = true) {
    if (sound) playSound("audio/button.wav");

    cookies += multiplier;
    counter.animate(numberAnim, animLength);

    updateUI();
}

export function spendCookies(number, animate = false) {
    cookies -= number;
    if (animate) counter.animate(numberAnim, animLength);
}

upgradeButton.addEventListener("click", function () {

    if (cookies >= multCost) {
        playSound("audio/upgrade.wav");

        cookies -= multCost;

        multiplier *= 2 + (rebirth - 1);

        multiplierDisplay.animate(numberAnim, animLength);
        costMultiplier += 0.35;
        multCost = Math.round(multCost * costMultiplier);
        
        updateUI();
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

export let rebirth = 1;
export let rebirthCost = 10000000;

function startRebirth() {
    //reset stats
    cookies = 0;
    multiplier = 1;
    multCost = 10;
    costMultiplier = 1;

    rebirth++;
    rebirthCost *= 1000000;
    rebirthDisplay.innerText = `Rebirth ${rebirth}`;
    rebirthDisplay.hidden = false;
    rebirthButton.hidden = true;

    resetPowerups();
    updateRebirth();
}

export function numberToWord(number, wordOnly = false) {
    if (number < 1000 && !wordOnly) return number;

    var divisions = 0;

    while (number > 10) {
        if (number / 1000 > 1) {
            number /= 1000;
            divisions++;
        }
        else break;
    }

    var word = "";
    if (!wordOnly) var word = number.toFixed(2).toString();

    while (divisions > 0) {
        if (divisions == 1) {
            if (!wordOnly) word += " ";
            word += "thousand"
            divisions -= 1;
        } else if (divisions == 2) {
            if (!wordOnly) word += " ";
            word += "million"
            divisions -= 2;
        } else if (divisions == 3) {
            if (!wordOnly) word += " ";
            word += "billion"
            divisions -= 3;
        } else if (divisions == 4) {
            if (!wordOnly) word += " ";
            word += "trillion"
            divisions -= 4;
        } else if (divisions == 5) {
            if (!wordOnly) word += " ";
            word += "quadrillion"
            divisions -= 5;
        } else if (divisions == 6) {
            if (!wordOnly) word += " ";
            word += "quintillion"
            divisions -= 6;
        } else if (divisions == 7) {
            if (!wordOnly) word += " ";
            word += "sextillion"
            divisions -= 7;
        } else if (divisions == 8) {
            if (!wordOnly) word += " ";
            word += "septillion"
            divisions -= 8;
        } else if (divisions == 9) {
            if (!wordOnly) word += " ";
            word += "octillion"
            divisions -= 9;
        } else if (divisions >= 10) {
            if (!wordOnly) word += " ";
            word += "nonillion"
            divisions -= 10;
        } else if (divisions >= 11) {
            if (!wordOnly) word += " ";
            word += "decillion"
            divisions -= 11;
        }
    }

    return word;
}