var mario;
var platformGroup, obstacleGroup;
var marioAnimation, obstacleAnimation, wallAnimation, groundAnimation;
var flag;
var LOSE=0;
var PLAY=1;
var WIN=2;
var gameState=PLAY;
function preload()
{
  marioAnimation=loadAnimation("images/Capture1.png","images/Capture4.png","images/Capture3.png");
  obstacleAnimation=loadAnimation("images/obstacle1.png");
  wallAnimation=loadAnimation("images/wall.png");
  groundAnimation=loadAnimation("images/ground.png");  
  flagAnimation=loadAnimation("images/Flag.png");
}

function setup() {
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668);
  var countDistanceX = 0;
  var platform;
  var gap;
  
  //creating a player mario
  mario = new Player();
  
  //creating a group
  platformGroup= createGroup();
  obstacleGroup=createGroup();
  //adding platforms to stand for mario
  for (var i=0;i<26;i++)
	 {
     frameRate(30);
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);//Adding each new platform to platformGroup
      gap=random([0,0,0,0,200]);//givin randome value to gap
      countDistanceX = countDistanceX + platform.spt.width + gap; //counting x location of next platform to be build
      //adding wall to the game
      if(i%3===0)
      {
      wall=new Wall(countDistanceX);
      platformGroup.add(wall.spt);
      }
      //adding obstacles to the game
      if(i%4==0)
      {
      obstacle=new Obstacle(countDistanceX);
      obstacleGroup.add(obstacle.spt);
      }
  }
  flag=createSprite(countDistanceX-100,height-320);
  flag.addAnimation("flagimg",flagAnimation);
  flag.scale=0.5;
  flag.setCollider("rectangle",0,0,150,6520);
flag.debug=false
}

function draw() {
  background('skyblue');
  //code to move the camera
  translate(  -mario.spt.x + width/2 , 0);
  if(gameState==PLAY)//Play state
  {  
          //apply gravity to mario and set colliding with platforms
        mario.applyGravity();
        mario.spt.collide(platformGroup);
        
        //Calling various function to controll mario
        if (keyDown("left"))  
        { 
          mario.moveLeft();
        }
        if (keyDown("right")) 
        { 
          mario.moveRight();
        }
        if (keyDown("up") && mario.spt.velocityY===0) 
        {
          mario.jump();
        }

         
     if (mario.spt.isTouching(obstacleGroup) || mario.spt.y>height){
      gameState=LOSE
        }
       if( mario.spt.isTouching(flag)){
             gameState=WIN
       }
      }

  if(gameState===LOSE){   

    obstacleGroup.setVelocityXEach(0)
    mario.spt.velocityY=0
    mario.spt.pause() 

    textSize(50)
    
  
    textFont("Broadway");
    fill("yellow");
    stroke("red");
    strokeWeight(5);
    text("BYE MARIO!!",mario.spt.x, 300)

  }

  if(gameState===WIN){
    obstacleGroup.setVelocityXEach(0)
    mario.spt.velocityY=0
    mario.spt.pause() 

    textSize(50)
    textFont("Broadway");
    fill("yellow");
    stroke("red");
    strokeWeight(5);
    text("YOU WON",mario.spt.x, 300)
 

  }
  
  
   drawSprites();
}



