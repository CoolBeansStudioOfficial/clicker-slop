import { playSound } from "./audio.js";
import { clickCookie, numberToWord, cookies, spendCookies, multiplier } from "./game.js";
import { updateUI } from "./ui.js";



//autoclick

let autoclickButton = document.getElementById("autoclick");
export let autoclickCost = 1001;
let autoclickOn = false;
let clickDelay = 1000;

autoclickButton.addEventListener("click", function() {
    if (cookies >= autoclickCost) { 
        playSound("audio/powerup.wav");
        spendCookies(autoclickCost);

        if (!autoclickOn) autoclickOn = true;
        else {
            clickDelay /= 2;
            autoclickCost *= 10;
        }
        
        autoclickButton.innerText = `Upgrade autoclick:\n${numberToWord(autoclickCost)}`;

        updateUI();
    }
});

setTimeout(autoClick, clickDelay);

function autoClick() {
    if (autoclickOn) clickCookie(false);
    setTimeout(autoClick, clickDelay);
}

//crumbs

let crumbsButton = document.getElementById("crumbs");
let crumb = document.getElementById("crumb");
export let crumbsCost = 5001;
let crumbsOn = false;
let crumbsDelay = 10000;

crumbsButton.addEventListener("click", function() {
    if (cookies >= crumbsCost) { 
        playSound("audio/powerup.wav");
        spendCookies(crumbsCost);

        if (!crumbsOn) {
            crumbsOn = true;
            spawnCrumb();
        }
        else {
            crumbsDelay /= 2;
            crumbsCost *= 10;
        }
        
        crumbsButton.innerText = `Upgrade crumbs:\n${numberToWord(crumbsCost)}`;

        updateUI();
    }
});

function spawnCrumb() {
    crumb.style = `top: ${Math.random() * 100}px; left: ${Math.random() * 100}px;`
    crumb.hidden = false;
    crumb.innerHTML = `${multiplier * 100} cookies`
}

crumb.addEventListener("click", function () {
    spendCookies(-multiplier * 100, true);
    setTimeout(spawnCrumb, crumbsDelay);
    crumb.hidden = true;
})
