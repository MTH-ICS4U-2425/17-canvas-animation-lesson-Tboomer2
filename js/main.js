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
import { CANVAS, CTX, MS_PER_FRAME, KEYS, $ } from "./globals.js";

// Globals
const HERO = new Player(75, 50, 48, 48);
let ground = new Image()
ground.src = "../images/dino_large.png"
ground.x_pos = 1
let frame_time = performance.now()
let HITBOXES = []

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
if ([KEYS.W,KEYS.UP_ARROW,KEYS.SPACE].includes(event.keyCode)) //!!!!
  HERO.jump()
}
//e
// Ground class
class grounds{
  sx
  sy = 103
  sw 
  h = 26
  dx = $("game_canvas").width
  dy = 300
  dw = 400
  dh = 26
  flag = false
  img = new Image()
  constructor(sx=randInt(1,1900),width=400){
    this.sx=sx
    this.sw=width
  }

  //drawImage(img,sx,sy,sw,h,dx,dy,dw,dh)
  check(){
    if(this.dx+this.dw <= 0){
      return false
    }
    return true
  }

  draw(){
    this.img.src="../images/dino_large.png"
    CTX.drawImage(this.img,this.sx,this.sy,this.sw,this.h,this.dx,this.dy,this.dw+4,this.dh)
    this.dx -= 4
  }
}
class hitbox{
  x
  y
  height
  width
  speed
  name
  constructor(x,y,h,w,s=0,name=""){
    this.x = x 
    this.y = y
    this.height = h
    this.width = w
    this.speed = s
    this.name=name
  }
  get right(){ return this.x +this.width }
  get bottom(){ return this.y +this.height }
  get top(){ return this.y }
  get left(){ return this.x }

  
  drawTest(){
    CTX.beginPath()
    CTX.lineWidth = "6";
    CTX.strokeStyle = "red";
    CTX.rect(this.x,this.y,this.height,this.width)
    CTX.stroke()
  }
  move(){
    this.x--
  }
  check(){
    const x1  = HERO.left
    const x2  = HERO.right
    const y1  = HERO.bottom
    const y2  = HERO.top
    
    const x3  = this.left
    const x4  = this.right
    const y3  = this.bottom
    const y4  = this.top
    // console.log(x1,x2,y1,y2)
    // console.log(x3,x4,y3,y4)

    // return !(y3 >= y2 || y4 <= y1 ||  x3 >= x2 || x4 <= x1)
    if (!(y3 >= y2 || y4 <= y1 ||  x3 >= x2 || x4 <= x1)){
      console.log("Hti")
      return true
    }
  }
}
let cactus = new hitbox(300,300,30,30)
let temp= new grounds()
let floors = [temp]
function offscreen(){
  for (let i = 0; i < floors.length;){
    if (floors[i].check()==false){
      floors.shift() 
    }
    if (floors[i].dx+floors[i].dw <= $("game_canvas").width && floors[i].flag == false){
      floors[i].flag = true
      temp= new grounds()
      floors.push(temp)
    }
      floors[i].draw()
      i++
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
  offscreen()
  cactus.drawTest()
  cactus.move()
  cactus.check()
  // ground.classList.add("inverted")
  //drawImage(img,sx,sy,sw,h,dw,dh)
  // CTX.drawImage(ground,1,103,2300,26,ground.x_pos,300,2300,26)
  // ground.x_pos -= 5
  // Draw our hero
  HERO.update();
  
}

// Start the animation
update()
