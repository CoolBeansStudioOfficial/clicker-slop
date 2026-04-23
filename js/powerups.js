import { playSound } from "./audio.js";
import { clickCookie, numberToWord, cookies, spendCookies, multiplier } from "./game.js";
import { updateUI } from "./ui.js";



//autoclick

let autoclickButton = document.getElementById("autoclick");
export let autoclickCost = 500;
let autoclickOn = false;
let clickDelay = 500;

autoclickButton.addEventListener("click", function() {
    if (cookies >= autoclickCost) { 
        playSound("audio/powerup.wav");
        spendCookies(autoclickCost);

        if (!autoclickOn) {
            autoclickOn = true;
            setTimeout(autoClick, clickDelay);
        }
        else clickDelay /= 2;

        autoclickCost *= 10;
        
        autoclickButton.innerText = `Upgrade autoclick:\n${numberToWord(autoclickCost)}`;

        updateUI();
    }
});

function autoClick() {
    if (autoclickOn) clickCookie(false);
    setTimeout(autoClick, clickDelay);
}

//crumbs

let crumbsButton = document.getElementById("crumbs");
let crumb = document.getElementById("crumb");
export let crumbsCost = 5001;
let crumbsOn = false;
let crumbsDelay = 5000;

crumbsButton.addEventListener("click", function() {
    if (cookies >= crumbsCost) { 
        playSound("audio/powerup.wav");
        spendCookies(crumbsCost);

        if (!crumbsOn) {
            crumbsOn = true;
            spawnCrumb();
        }
        else crumbsDelay /= 2;
            
        crumbsCost *= 1000;
        
        crumbsButton.innerText = `Upgrade crumbs:\n${numberToWord(crumbsCost)}`;

        updateUI();
    }
});

let position = "left";

function spawnCrumb() {
    if (position == "left") position = "right";
    else position = "left";
    crumb.style = `top: ${Math.random() * 250}px; ${position}: ${clamp(Math.random() * 500, 250, 500)}px;`
    crumb.hidden = false;
    crumb.innerHTML = `${numberToWord(multiplier * 1000)} cookies`
}

crumb.addEventListener("click", function () {
    playSound("audio/crumb.wav");
    spendCookies(-multiplier * 1000, true);
    setTimeout(spawnCrumb, crumbsDelay);
    crumb.hidden = true;

    updateUI();
});

function clamp(number, minimum, maximum) {
	return Math.min(Math.max(number, minimum), maximum);
}
