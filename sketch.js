var PLAY = 1;
var END = 0;
var gameState = PLAY;
//119,163
var bg,invisibleground,bgimg;
var runner,runnerimg;
var coin,coinimg;
var obstacle1, obstacle2, obstacle3, obstacle4;
var obstaclegroup,coingroup;

var score=0;

function preload(){
bgimg=loadAnimation("back.jpg");
runnerimg=loadAnimation("1.png","2.png","3.png","4.png");
coinimg=loadImage("coin.png");
obstacle1 = loadImage("11.png");
obstacle2 = loadImage("22.png");
obstacle3 = loadImage("33.png");
obstacle4 = loadImage("44.png");

}
function setup(){
 createCanvas(600,400);

  
  bg=createSprite(0,100,1200,900);
  bg.addAnimation("xvdvz",bgimg);
  //bg.scale=0.1;
  bg.velocityX=-6;
  
  runner=createSprite(50,320);
  runner.addAnimation("nner",runnerimg);
  runner.scale=0.5;
 
 invisibleground = createSprite(50,350,40000,5);
  invisibleground.visible = false;
  
  coingroup=createGroup();
  obstaclegroup=createGroup();
  
  score=0;
  
                           
}
function draw(){
  background("black");
  
   
  if(gameState===PLAY){
     if(bg.x<120){
 bg.x=bg.width/2
  }
    

  if(keyDown("space")&& runner.y>= 190) {
        runner.velocityY = -12;
    }
  runner.velocityY = runner.velocityY + 0.8
  spawncoins();
 spawnobstacles();
  runner.collide(invisibleground);
    if(coingroup.isTouching(runner)){

   score=score+2;
  coingroup.destroyEach();
    }
  if(obstaclegroup.isTouching(runner)){
   gameState=END;
   runner.destroy();
   bg.destroy();
   coin.destroy();
  obstaclegroup.destroyEach();
  
     
  }
  }
  else if(gameState===END){
  fill("yellow");
  textSize(20);
  text("Press CTRL+R To Restart",200,200);
   
  
  
  } 
  drawSprites();
  fill("black");
  textSize(30);
  text("Score: "+ score, 400,50);
}
function spawncoins(){
  if(frameCount%120===0){
  coin=createSprite(1500,150);
  coin.addImage("xuz",coinimg);
  coin.scale=0.2;
  coin.x=Math.round(random(200,460));
  coin.velocityX=-3;
  coin.lifetime=200;
   coin.depth = runner.depth;
    runner.depth = runner.depth + 1;
  coingroup.add(coin);
  }
}
function spawnobstacles(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(200,280,10,40);
   obstacle.velocityX = -3
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = runner.depth;
    obstacle.depth = runner.depth + 1;
   obstaclegroup.add(obstacle);
 }
}