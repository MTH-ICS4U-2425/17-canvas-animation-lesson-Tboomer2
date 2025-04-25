/**
 * player.js
 * 
 * The Player Class
 * 
 * Acts as a sprite or "hero" for the game
 * 
 * Author: 
 */

import { CTX, CANVAS, GRAVITY, FLOOR } from "./globals.js"

export default class Player {
  ground = true
  img = new Image()
  timer = 0
  crouch= false
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.img.src = "../images/dino_large.png"
    this.position = {
      x: x,
      y: y
    }
    this.velocity = {
      x: 0,
      y: 0
    };
  
  }

  get right(){ return this.position.x +this.width }
  get bottom(){ return this.position.y +this.height }
  get top(){ return this.position.y }
  get left(){ return this.position.x }
  /**
   * Main function to update location, velocity, and image
   */
  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.gravity()
    this.draw();
   
  }
  frameOne(){
    CTX.drawImage(this.img,1854.5,0,87,100,this.position.x,this.position.y,this.width,this.height)
  }
  frameTwo(){
    CTX.drawImage(this.img,1942.5,0,87,100,this.position.x,this.position.y,this.width,this.height)
  }
  frameOneCrouch(){
    CTX.drawImage(this.img,2324,9,120,95,this.position.x,this.position.y,this.width,this.height)
  }
  frameTwoCrouch(){
    CTX.drawImage(this.img,2204,9,120,95,this.position.x,this.position.y,this.width,this.height)
  }
  /**
   * Draw the player on the canvas
   */
  draw() {
    if (this.crouch==false){
    if(this.timer>=10){
      this.frameTwo()
      this.timer++

      if (this.timer >= 20){
        this.timer = 0
      }
    }else{
      this.frameOne()
      this.timer++
    }
  } // swich the model if your crouched
    if (this.crouch==true){
    if(this.timer>=10){
      this.frameTwoCrouch()
      this.timer++

      if (this.timer >= 20){
        this.timer = 0
      }
    }else{
      this.frameOneCrouch()
      this.timer++
    }
  }
    
  }
  crouchToggle(toggle){ //crouching
    if(toggle==false){
      this.position.y=this.position.y+38
      this.width=86
      this.height=36
      this.crouch=true
      return
    }
    if(toggle==true){
      this.width=48
      this.height=48
      this.crouch=false
      return
    }
  }
  jump(){
    if (this.grounded == true){
      this.velocity.y -= 16
      this.grounded== false
    }
    
  }

  gravity(){
    if (this.bottom >= FLOOR){
      this.velocity.y = 0
      this.position.y = FLOOR - this.height
      this.grounded=true
    } else {
      this.grounded=false
      this.velocity.y += GRAVITY
    }
  }
}
