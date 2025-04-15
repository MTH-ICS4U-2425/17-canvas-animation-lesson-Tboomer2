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
  /**
   * Draw the player on the canvas
   */
  draw() {
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
    
  }

  jump(){
    if (this.grounded == true){
      this.velocity.y -= 20
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
