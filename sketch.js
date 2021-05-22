var tower,towerImg;
var door,doorImg;
var doorGroup;
var ghost,ghostImg;
var position;
var gamestate=0;



function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  ghostImg=loadImage("ghost-standing.png");
}


function setup(){
  createCanvas (1200,600);
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4;

  camera.position.x = displayWidth/2;
  camera.position.y =  ghost.y;
  
  
  
  
  
  doorGroup=new Group ();


  
}


function draw(){
  background("black");
  if(tower.y>400){tower.y=300}
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  if(keyDown("RIGHT_ARROW")){
    ghost.velocityX=ghost.velocityX+3;
  }
  if(keyDown("LEFT_ARROW")){
    ghost.velocityX=ghost.velocityY-3;
  }
  ghost.velocityY=ghost.velocityY+0.5;
  spawnDoors();
  if(doorGroup.isTouching(ghost)){
    gameState=2;
  };
  
  drawSprites();
  
}

function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage("door",doorImg);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=800;
    doorGroup.add(door);
    door.scale=1.5;
    
  }

  
  
  
  
  
  
}



function getState(){
  var gameStateRef  = database.ref('gameState');
  gameStateRef.on("value",function(data){
     gameState = data.val();
  })
 
}

function update(state){
  database.ref('/').update({
    gameState: state
  });
};

async function start(){
  if(gameState === 0){
    player = new Player();
    var playerCountRef= await database.ref('playerCount').once("value")
    if(playerCountRef.exists()){
      playerCount=playerCountRef.val();
      player.getCount();
    }}}