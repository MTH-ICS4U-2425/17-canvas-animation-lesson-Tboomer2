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
import { CANVAS, CTX, MS_PER_FRAME, KEYS, $ , CACTUS } from "./globals.js";

// Globals
const HERO = new Player(75, 50, 48, 48);
let ground = new Image()
ground.src = "../images/dino_large.png"
ground.x_pos = 1
let score = 0
let tempscore = 0
let frame_time = performance.now()
let HITBOXES = []
let cactusTimer = 0
let cactusWait = randInt(10,20)
let BASESPEED = 4.5
var highScore = localStorage.getItem('High Score')
//Random integer
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Event Listeners
document.addEventListener("keydown", keypress);
document.addEventListener("keyup", keyplift);

// Disable the context menu on the entire document
document.addEventListener("contextmenu", (event) => { 
  event.preventDefault();
  return false; 
});

/**
 * The user pressed a key on the keyboard 
 */
function keypress(event) {
if ([KEYS.W,KEYS.UP_ARROW,KEYS.SPACE].includes(event.keyCode)){
  HERO.jump()
  game=true
  }
if ([KEYS.S,KEYS.DOWN_ARROW].includes(event.keyCode)){
    HERO.crouchToggle(false)
  }
}

// lift key event for uncrouching the dino and stopping spam
function keyplift(event) {
  if ([KEYS.S,KEYS.DOWN_ARROW].includes(event.keyCode)){
      HERO.crouchToggle(true)
    }
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
    this.dx -= BASESPEED
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

  
  drawTest(){ // shows te hitboxes
    CTX.beginPath()
    CTX.lineWidth = "6";
    CTX.strokeStyle = "red";
    CTX.rect(this.x,this.y,this.height,this.width)
    CTX.stroke()
  }
  move(){
    this.x -= this.speed
  }
  check(){ //checks the hitboxes
    let c1 = [this.left,this.top]
    let c2 = [this.right,this.top]
    let c3 = [this.right,this.bottom]
    let c4 = [this.left,this.bottom]
    
    let h1 = [HERO.left,HERO.top]
    let h2 = [HERO.right,HERO.top]
    let h3 = [HERO.right,HERO.bottom]
    let h4 = [HERO.left,HERO.bottom]

    if (c1[1] <= h3[1]&& c1[0] <= h3[0] && h3[0] <= this.right && h3[1] <= this.bottom){
      console.log("hit")
      game=false
    }
    if (c2[1] <= h4[1]&& c2[0] >= h4[0] && h4[0] >= this.left && h4[1] <= this.bottom){
      console.log("hit")
      game=false
    }
    if (c1[1]-HERO.height <= h3[1]-HERO.height && c1[0] <= h3[0] && h3[0] <= this.right && h3[1]-HERO.height <= this.bottom){
      console.log("hit")
      game=false
    }
    if (c2[1]-HERO.height <= h4[1]-HERO.height && c2[0] >= h4[0] && h4[0] >= this.left && h4[1]-HERO.height <= this.bottom){
      console.log("hit")
      game=false
    }
  
    
  }
}

class cactus extends hitbox{ //base cactus
  img = new Image()
  constructor(x,y,h,w,s=0,name=""){
    super(x,y,h,w,s,name)
    this.img.src = "../images/dino_large.png"
  }

  draw(){
      // CTX.drawImage(this.img,1854.5,0,87,100,super.x,super.y,super.width,super.height)
    CTX.drawImage(this.img,1900.5,0,this.width,40,this.x, this.y, this.width, this.height)
  
  }
}

class flyingCactus extends cactus{ // flying cactus variant
  constructor(x,y,h,w,s=0,name=""){
    super(x,CANVAS.height-randInt(50,150),h,w,s,name)
  }
}
function createCactus(){
  score=score+10
  tempscore=tempscore+10

  const tempNumber = randInt(1,3)
  if (tempNumber==1){
    let cactuss = new flyingCactus(CANVAS.width,300,30,30,BASESPEED+1,"Flying Cactus")
    CACTUS.push(cactuss)
  }
  if (tempNumber==2){
    cactuss = new cactus(CANVAS.width,300,30,30,BASESPEED,"Cactus")
    CACTUS.push(cactuss)
    cactuss = new cactus(CANVAS.width+30,300,30,30,BASESPEED,"Cactus")
    CACTUS.push(cactuss)
  }
  if (tempNumber==3){
    cactuss = new cactus(CANVAS.width,300,30,30,BASESPEED,"Cactus")
    CACTUS.push(cactuss)
    cactuss = new cactus(CANVAS.width+30,300,30,30,BASESPEED,"Cactus")
    CACTUS.push(cactuss)
    cactuss = new cactus(CANVAS.width+60,300,30,30,BASESPEED,"Cactus")
    CACTUS.push(cactuss)
  }
}
function moveCactus(){
  for(let i = 0; i < CACTUS.length; i++){
    if (CACTUS[i].name=="Cactus"){
      CACTUS[i].speed=BASESPEED
    }
    CACTUS[i].check()
    CACTUS[i].move()
    CACTUS[i].draw()
  }
}
function updateCactus(){ //updates all cactus
  if(cactusTimer >= 80+cactusWait){
    createCactus()
    cactusTimer = 0
    cactusWait = randInt(10,20)
  }
  moveCactus()
  cactusTimer++
  }
let cactuss = new cactus(CANVAS.width+60,300,30,30,4,"Cactus")
let temp= new grounds()
let floors = [temp]
function scrollground(){
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
let game = false
/**
 * The main game loop
 */
function update() {
  // Prepare for the next frame
    requestAnimationFrame(update)
    if (game==true){
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
  scrollground()  
  HERO.update();
  updateCactus()
  CTX.font = "30px Press-Start-2P"
    CTX.fillText(score, CANVAS.width-100, 50);
    CTX.font = "30px Press-Start-2P"
    CTX.fillText(highScore, CANVAS.width-300, 50);
    CTX.font = "20px Press-Start-2P"
    CTX.fillText("SCORE", CANVAS.width-120, 21);
    CTX.fillText("HIGH SCORE", CANVAS.width-340, 21);

      if(tempscore>=100){
        BASESPEED++
        tempscore=0
      }

    }
    if (game ==false){
      if(score>highScore){ // update the score
        localStorage.setItem("High Score",score)
        highScore=score
        
      }
      CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
      CTX.font = "30px Press-Start-2P"
      CTX.fillText("Press Space,W or Up arrow to start", CANVAS.width/3.5, CANVAS.height/2);
      score = 0
      tempscore = 0
      frame_time = performance.now()
      CACTUS.length=0 
      HITBOXES = []
      cactusTimer = 0
      cactusWait = randInt(10,20)
      BASESPEED = 4.5
      floors =[temp]
    }

  // Draw our hero
  
}

// Start the animation

update()

