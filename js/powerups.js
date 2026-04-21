import { clickCookie } from "./game.js";

let autoclickButton = document.getElementById("autoclick")

let autoclickOn = true;
let clickSpeed = 1;

//button functions
autoclickButton.addEventListener("click", function() {

});

//powerup functions

setTimeout(autoClick, clickSpeed * 1000);

function autoClick() {
    if (!autoclickOn) return;
    clickCookie(false);
    setTimeout(autoClick, clickSpeed * 1000);
}