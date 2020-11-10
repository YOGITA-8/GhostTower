  var tower ,towerImg;
  var door,doorImg;
  var doorGroup;
  var climber,climberImg;
  var climberGroup;
  var ghost,ghostImg;
  var invBlo,invBloGroup;
  var gameState = "PLAY";


function preload(){
  
  towerImg=loadImage("tower.png");
  
  doorImg=loadImage("door.png");
  
  climberImg=loadImage("climber.png");
  
  ghostImg=loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");

}



function setup(){
  
  createCanvas(600,600);
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=2;
  
  ghost=createSprite(200,200);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invBloGroup=new Group();
  
  spookySound.loop();
  
}



function draw(){
  
  background(0);
  
    if (gameState==="PLAY"){
    
    //reset the tower
    if (tower.y>400){
      tower.y=300;
    }

    //pressed left 
    if (keyDown("left_arrow")){
      ghost.x=ghost.x-3;

    }

    //pressed right
    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }

    //pressed space
    if(keyDown("space")){
      ghost.velocityY=-5;
    }

    //adding gravity to ghost
    ghost.velocityY=ghost.velocityY+0.8;

    //ghost will collide  
    if (climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }

    //if ghost will touch invBlo group gameState will END
    if (invBloGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy();
      gameState="END";
    }

    spawnDoors();
    
    }

  
      drawSprites();

   if (gameState === "END"){
      
      tower.velocityY=0;
      background("green");
      stroke("pink");
      fill("pink");
      textSize(40);
      text("Game Over", 200,200)
     
   }
  



  }

  function spawnDoors(){

    if (frameCount%240===0){

      //DOOR 
      var door=createSprite(200,50);
      door.addImage("door",doorImg);

      //CLIMBER
      var climber=createSprite(200,100);
      climber.addImage("climber",climberImg);
      
      //INVBLO
      var invBlo=createSprite(200,115);
      invBlo.width=climber.width;
      invBlo.height=2;

      door.x=Math.round(random(120,400));

      door.x=climber.x;
      invBlo.x=door.x;

      //defining velocity (speed) to move
      door.velocityY=2;
      climber.velocityY=2;
      invBlo.velocityY=2;

      //setting lifetime 
      door.lifetime=600;
      climber.lifetime=600;
      invBlo.lifeTime=600;
      
      //adding to 3 groups
      doorGroup.add(door);
      climberGroup.add(climber);
      invBloGroup.add(invBlo);

      //ghost will appear above door as ghost depth is more 
      ghost.depth= door.depth;
      ghost.depth+=1;

      }
  
}
