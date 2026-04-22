import { playSound } from "./audio.js";
import { clickCookie, numberToWord, cookies, spendCookies } from "./game.js";

let autoclickButton = document.getElementById("autoclick");
export let autoclickCost = 1001;
let autoclickOn = false;
let clickDelay = 1000;

//button functions

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
    }
});

//powerup functions

setTimeout(autoClick, clickDelay);

function autoClick() {
    if (autoclickOn) clickCookie(false);
    setTimeout(autoClick, clickDelay);
}