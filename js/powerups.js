import { clickCookie, numberToWord, cookies, spendCookies } from "./game.js";

let autoclickButton = document.getElementById("autoclick")
let autoclickCost = 1000;
let autoclickOn = false;
let clickSpeed = 1;

//button functions

autoclickButton.addEventListener("click", function() {
    if (cookies >= autoclickCost) { 
        spendCookies(autoclickCost);
        autoclickOn = true;
        autoclickCost ^= 2;
        autoclickButton.innerText = `Upgrade auto-clicker:\n${numberToWord(autoclickCost)}`;
    }
});

//powerup functions

setTimeout(autoClick, clickSpeed * 1000);

function autoClick() {
    if (!autoclickOn) return;
    clickCookie(false);
    setTimeout(autoClick, clickSpeed * 1000);
}