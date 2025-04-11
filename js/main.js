/**
 * ICS4U - Mr. Brash 🐿️
 * 
 * 17 - Canvas Animation
 * 
 * Author:
 * 
 */

'use strict';

import Player from "./player.js";
import { CANVAS, CTX, MS_PER_FRAME, KEYS } from "./globals.js";

// Globals
const HERO = new Player(20, 50, 48, 48);
let ground = new Image()
ground.src = "../images/dino_large.png"
ground.x_pos = 1
let frame_time = performance.now()

//Random integer
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Event Listeners
document.addEventListener("keydown", keypress);

// Disable the context menu on the entire document
document.addEventListener("contextmenu", (event) => { 
  event.preventDefault();
  return false; 
});

/**
 * The user pressed a key on the keyboard 
 */
function keypress(event) {
if (event.keyCode == KEYS.SPACE)
  HERO.jump()
}

// Ground class
class grounds{
  sx
  sy = 103
  sw 
  h = 26
  dx = 1
  dy = 300
  dw = 2300
  dh = 26

  img = new Image()
  constructor(sx=randInt(1,2300),width=randInt(1,2300),src="../images/dino_large.png"){
    this.sx=x
    this.sw=width
    this.img.src=scr
  }

  //drawImage(img,sx,sy,sw,h,dx,dy,dw,dh)
  draw(){
    CTX.drawImage(this.img,this.sx,this.sy,this.sw,this.h,this.dx,this.dy,this.dw,this.dh)
    this.dx++
  }
}

/**
 * The main game loop
 */
function update() {
  // Prepare for the next frame
  requestAnimationFrame(update)
  
  /*** Desired FPS Trap ***/
  const NOW = performance.now()
  const TIME_PASSED = NOW - frame_time
  
  if (TIME_PASSED < MS_PER_FRAME) return
  
  const EXCESS_TIME = TIME_PASSED % MS_PER_FRAME
  frame_time = NOW - EXCESS_TIME
  /*** END FPS Trap ***/
  
  // Clear the canvas
  CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

  //Draw the ground
  let temp= new grounds()
  temp.draw()
  // ground.classList.add("inverted")
  //drawImage(img,sx,sy,sw,h,dw,dh)
  // CTX.drawImage(ground,1,103,2300,26,ground.x_pos,300,2300,26)
  // ground.x_pos -= 5
  // Draw our hero
  HERO.update();
  
}

// Start the animation
update()
