import { playSound } from "./audio.js";
import { clickCookie, numberToWord, cookies, spendCookies } from "./game.js";
import { updateUI } from "./ui.js";



//button functions

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

let crumbsButton = document.getElementById("crumbs");
export let crumbsCost = 10001;
let crumbsOn = false;
let crumbsDelay = 10000;

crumbsButton.addEventListener("click", function() {
    if (cookies >= crumbsCost) { 
        playSound("audio/powerup.wav");
        spendCookies(crumbsCost);

        if (!crumbsOn) crumbsOn = true;
        else {
            crumbsDelay /= 2;
            crumbsCost *= 10;
        }
        
        crumbsButton.innerText = `Upgrade crumbs:\n${numberToWord(crumbsCost)}`;

        updateUI();
    }
});

//powerup functions

setTimeout(autoClick, clickDelay);

function autoClick() {
    if (autoclickOn) clickCookie(false);
    setTimeout(autoClick, clickDelay);
}