import { playSound } from "./audio.js";
import { updateRebirth, updateUI } from "./ui.js";

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

export function spendCookies(number) {
    cookies -= number;
}

upgradeButton.addEventListener("click", function () {

    if (cookies >= multCost) {
        playSound("audio/upgrade.wav");

        cookies -= multCost;

        multiplier *= 2 + (rebirth - 1);

        multiplierDisplay.animate(numberAnim, animLength);
        costMultiplier += 0.65;
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
export let rebirthCost = 1000000;

function startRebirth() {
    //reset stats
    cookies = 0;
    multiplier = 1;
    multCost = 10;
    costMultiplier = 1;

    rebirth++;
    rebirthCost *= 10000000;
    rebirthDisplay.innerText = `Rebirth ${rebirth}`;
    rebirthDisplay.hidden = false;
    rebirthButton.hidden = true;

    updateRebirth();
}

export function numberToWord(number) {
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
        } else if (divisions == 2) {
            word += " million"
            divisions -= 2;
        } else if (divisions == 3) {
            word += " billion"
            divisions -= 3;
        } else if (divisions == 4) {
            word += " trillion"
            divisions -= 4;
        } else if (divisions == 5) {
            word += " quadrillion"
            divisions -= 5;
        } else if (divisions == 6) {
            word += " quintillion"
            divisions -= 6;
        } else if (divisions == 7) {
            word += " sextillion"
            divisions -= 7;
        } else if (divisions == 8) {
            word += " septillion"
            divisions -= 8;
        } else if (divisions == 9) {
            word += " octillion"
            divisions -= 9;
        } else if (divisions >= 10) {
            word += " decillion"
            divisions -= 10;
        }
    }

    return word;
}