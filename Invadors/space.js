let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");


(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  var cancvelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
})();
var animationID;


let spriteBase64 = "data:image/png;base64,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PD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOnBsdXM9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYveG1wLzEuMC8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOmNmOGFmYTU4LWIzZmYtNGFjNi04M2VkLTU0ZDk3MGZiMDI2YiIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNTc1YTAzOS1lMTNkLTQ2MTYtOTJjYi00ZDZiMWVlZTA4OTUiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NDlmMDhiZS1kMzFjLTQ2ZWItYjBmNC00ZWM2YjY0NWVmZjEiCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IldpbmRvd3MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjE3Njk4Mzg5MTA5NzYxIgogICBHSU1QOlZlcnNpb249IjIuMTAuMjIiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCI+CiAgIDxpcHRjRXh0OkxvY2F0aW9uQ3JlYXRlZD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkxvY2F0aW9uQ3JlYXRlZD4KICAgPGlwdGNFeHQ6TG9jYXRpb25TaG93bj4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgIDxpcHRjRXh0OkFydHdvcmtPck9iamVjdD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkFydHdvcmtPck9iamVjdD4KICAgPGlwdGNFeHQ6UmVnaXN0cnlJZD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmIyN2JlZjg1LWEwZDktNDZhNS04ZjBhLThkNjhiNWYyNDI4YSIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wMy0xMlQxNDoxODo0NyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmYzdhN2MwNC1kM2M1LTRmMjYtODYxMi1iYTRmZDcyOTE1YTAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMjEtMDQtMDZUMTA6Mzk6NDkiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogICA8cGx1czpJbWFnZVN1cHBsaWVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VTdXBwbGllcj4KICAgPHBsdXM6SW1hZ2VDcmVhdG9yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VDcmVhdG9yPgogICA8cGx1czpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkNvcHlyaWdodE93bmVyPgogICA8cGx1czpMaWNlbnNvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkxpY2Vuc29yPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+oaQ0sAAAAAZiS0dEADAAHgA+j7uQKAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+UEBggnMd++OmoAAAl+SURBVHja7Z1ZbFxXGcd/584dz+ItjRPbKU6arU4LlBJRSqEs44JQeRhXAiGxqkLwwBuoPLD1CYUihFSkIPqCWIRUiaVFwqNIaUHN0JemUVIHVDVqGkcJchPXTrwktScTz8zh4VzHM5PZPHeZwfN9UqSJ5t4z5/zu+f/Pd757PaPwIJZOPandnN//oUOKFoVFh4cAEAAdHsoPU/M7vDRNkYAA6HQPaHe9++0LIgEB0OFh+6G3er7i9nyZAQJAAEgeIHmASEAA+FcPqBd+r/NBFklFAgJAPMB7zWutax6vlFLt4gkiAQHQ6R5QT6+V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";
const tank = new Image();
tank.src = spriteBase64;
const invader = new Image();
invader.src = spriteBase64;
var startScreenTimeout;

//tank and sprite

var frameCount=0;
var armyPrevFrameCount=0;
var framesInOneSec = 1000/16;
var spritUnitHeight = 35;
var spriteUnitWidth = 64;
var scoreBarHeight = 50;
var tank__bottomOffset = (spritUnitHeight/2) + scoreBarHeight;
var tankX=canvas.width/2;
var tankdX = 4;
var tankY=canvas.height-(tank__bottomOffset);
var tankWidth= spriteUnitWidth/2;
var tankHeight =spritUnitHeight/2
var keys =[];

// score and lives

var score = 0;
var allowedLives = 3;
var lives = allowedLives;
var hasLifeDecreased = false;
var gameRunning = false;

// Invaders rows columns

var invaderWidth = spriteUnitWidth/2.5;
var invaderHeight = spritUnitHeight/2.5;
var invaderSpriteHeight = spritUnitHeight;
var invaderSpriteHeightsArray = [[68,102],[102,134],[102,134],[0,34],[0,34]];
var spriteSelector =0;
var armyRows = 5;
var armyColumns = 10;
var armyX = 60;
var armyY = 60;
var invaderLeftOffset = 15;
var invaderTopOffset = 20;
var armyDirection = "left";
var armyDx = 10;
var armyDy = 10;
var armySpeed = 40;  
var armySpeed__decrement = 8;
let aliveInvaders = armyColumns* armyRows;
var armyInvaderBulletsSpeed = 4;
var armyArray = [];

//  bullet

var bullet__height = 10;
var bullet__width = 3;
var tankBullet__x;
var tankBullet__y;
var shouldMoveTankBullet = false;
var tankBullet__dy = 10;

var invaderBulletsArray = [];
var invBullet_dy = 5;
var invBullet__prevFrameCount=0;


// Options

const background            = '#bfbfbf';                    
var particlesPerExplosion   = 50;
const particlesMinSpeed     = 1;
const particlesMaxSpeed     = 6;
const particlesMinSize      = 1;
var particlesMaxSize        = 8;
const explosions            = [];
var explosionColor = "white";
let fps        = 60;
const interval = 1000 / fps;

let now, delta;
let then = Date.now();

// main game loop

window.addEventListener('load', function() {
  drawStartScreen();  
})

function startGame(){
    clearInterval(startScreenTimeout);
    gameRunning=true;
    gameInit();
    constructArmy(armyX,armyY);  
    gameLoop();
}

function gameInit(){
  invaderBulletsArray = [];
  armyArray = [];
  score = 0;
  lives = allowedLives;
  armyDirection = "right";  
  aliveInvaders = armyColumns* armyRows;
  frameCount=0;
  armyPrevFrameCount=0;
  invBullet__prevFrameCount=0;
  hasLifeDecreased = false;
  armySpeed = 40;
}

function gameLoop(){

  //game lost 

  if(lives <= 0 || !gameRunning){
    gameRunning=false;
    ctx.clearRect(0,0,canvas.width,canvas.height);    
    drawScore();
    drawLives();    
    drawGameOver("you lost");
    drawBottomHelper();
    return false;
  }

  //game won 

  if(aliveInvaders == 0){
    gameRunning=false;
    drawGameOver("you won");
    drawBottomHelper();
    return false;
  }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  helperHandler();
  drawScoreSeprateLine();
  drawScore();
  drawLives();
  moveArmy();
  drawArmyOfInvaders();
  keyPressed();
  drawTank(tankX,tankY);  
  if(shouldMoveTankBullet) {
    drawBullet(tankBullet__x,tankBullet__y);
    moveTankBullet();
  }
  invadersBulletHandler();
  animationID =  requestAnimationFrame(gameLoop);
  frameCount++;

  //explosion

   now   = Date.now();
   delta = now - then;
   if (delta > interval) {
     then = now - (delta % interval);
     drawExplosion();
   }
 

}

// 

window.addEventListener("keydown", ()=>keys[event.keyCode] = true);
window.addEventListener("keyup", ()=>keys[event.keyCode] = false);
window.addEventListener("keypress", keypressedHandler);
function keyPressed() {
  if (keys[37]) {     
    if (tankX-tankdX>0) {
      tankX-=tankdX;
    }
  }
  if (keys[39]) {
    if(canvas.width - (tankX+tankWidth) > tankdX) {
      tankX+=tankdX;
    }  
  }
  if (keys[88] || keys[32]) {    
    if(!shouldMoveTankBullet)fireTankBullet();
  }
}
function keypressedHandler(){
  if(event.keyCode == "13" && !gameRunning){
    startGame();
  }
}


// handlers

function invadersBulletHandler(){
  if(invaderBulletsArray.length<3 &&  frameCount- invBullet__prevFrameCount>(armySpeed*armyInvaderBulletsSpeed)){
    generateInvaderRandomBullet();
    invBullet__prevFrameCount=frameCount;
  }
  moveInvaderBullets();

}

function generateInvaderRandomBullet(){
   
    let aliveArmy = [];
    for (let i = 0; i < armyRows; i++) {    
      for(let j = 0; j < armyColumns; j++){
        let soldier = armyArray[i][j];
        if(soldier.status=='alive')        
        aliveArmy.push(armyArray[i][j]);
      }
    }
    
    let rInvader = aliveArmy[genRandomNumber(aliveArmy.length)];
    if (rInvader.status=='alive') {
      let iBullet = {
        x : rInvader.x + invaderWidth/2,
        y : rInvader.y + invaderHeight    
      };
      invaderBulletsArray.push(iBullet);
      drawInvaderBullet(iBullet.x,iBullet.y);
    }
    

}

function genRandomNumber(rng){
  return Math.floor(Math.random()*rng);
}

function moveInvaderBullets(){
  for(let i = 0 ; i < invaderBulletsArray.length; i++){
    let iB = invaderBulletsArray[i];    
    iB.y = iB.y + invBullet_dy;

    //if bullet out of bounds

    if(iB.y > canvas.height){
      invaderBulletsArray.splice(i,1);
    }

    //if game over by hit bullet

    if(
      iB.x > tankX &&
      iB.x < tankX + tankWidth &&
      iB.y > tankY && 
      iB.y < tankY + tankHeight
    )
    {
      explosionColor="white";
      particlesPerExplosion   = 100;
      particlesMaxSize      = 4;
      triggerExplosion(tankX+tankWidth/2,tankY+tankHeight/2);
      invaderBulletsArray.splice(i,1);
      console.log("lost 1 life");            
      lives--;
      hasLifeDecreased=true;
    }

    drawInvaderBullet(iB.x,iB.y);

  }
}

function helperHandler(){
  if(aliveInvaders == armyColumns* armyRows){
    drawBottomMessage("press SPACE to fire bullet", 125);
  }  else
  if(hasLifeDecreased){
    drawBottomMessage(`HIT. Lives Left: ${lives}`, 150);
    setTimeout(() => {
    hasLifeDecreased=false;
    drawBottomMessage(``, 150);      
    }, 2000);
  }

}

// draw functions
function drawInvader(x,y,sHeight){
  ctx.beginPath();
  ctx.drawImage(
    invader,

    // Selection 

    0, 
    sHeight, 
    spriteUnitWidth, 
    spritUnitHeight, 

    // Drawing

    x, 
    y, 
    invaderWidth, 
    invaderHeight 
    );    
    ctx.closePath();
}


function drawTank(x,y){
  ctx.beginPath();
  ctx.drawImage(
    tank,

    // Selection

    0, 
    tank.height-50, 
    tank.width, 
    spritUnitHeight, 

    // Drawing
    x, 
    y, 
    tankWidth, 
    tankHeight 
    );
ctx.closePath();
}


function moveArmy(){
  if(frameCount-armyPrevFrameCount>armySpeed){
    armyPrevFrameCount=frameCount;
    invaderSpriteHeight=spritUnitHeight-invaderSpriteHeight;
    spriteSelector= 1 - spriteSelector;
  }
  else{
    return false;
  }
  let dx;
  let dy=0;
  if (armyDirection == 'right') {
    if(canvas.width - (armyX + (invaderWidth+invaderLeftOffset)*(armyColumns-1)) > invaderWidth){
      dx=1;
    }else{
      armyDirection='left';
      dx=-1;
      dy=armyDy;
    }
            
  } else
  if (armyDirection == 'left') {
      if (armyX-armyDx>0) {
      dx=-1;        
      }else{
        armyDirection='right';
        dx=1;
        dy=armyDy;
      }
      
  }

  armyX+=armyDx*(dx);
  updateArmy(dx*(armyDx),dy)
}


function constructArmy(aX,aY){
  for (let i = 0; i < armyRows; i++) {
    armyArray[i]=[];
    for(let j = 0; j < armyColumns; j++){
      armyArray[i][j]={
        x: aX + j*(invaderWidth + invaderLeftOffset),
        y:aY + i*(invaderHeight + invaderTopOffset),
        status:"alive"
      };
    }
  }
}

function updateArmy(adx,ady){    
  for (let i = 0; i < armyRows; i++) {    
    for(let j = 0; j < armyColumns; j++){
      let soldier = armyArray[i][j];
      soldier.x = soldier.x+(adx);
      soldier.y = soldier.y + ady;
      
    }
  }
}

function drawArmyOfInvaders(){
  for (let i = 0; i < armyRows; i++) {
    for(let j = 0; j < armyColumns; j++){
        let soldier = armyArray[i][j];
        if (soldier.status=='alive') {

          // drawInvader(soldier.x,soldier.y,invaderSpriteHeight);

          drawInvader(soldier.x,soldier.y,invaderSpriteHeightsArray[i][spriteSelector]);

            //chekc if game over by collision

            if(soldier.y > tankY){
              gameRunning=false;
            }
        }
      
    }
  }  
}


function drawBullet(bx,by){
  ctx.beginPath();
  ctx.beginPath();       
  ctx.moveTo(bx, by);    
  ctx.lineTo(bx, by-bullet__height);  
  ctx.lineWidth = bullet__width+2;
  ctx.shadowBlur = 5;
  ctx.shadowOffsetY=1;
  ctx.shadowOffsetY=-1;
  ctx.shadowColor="red";
  ctx.strokeStyle = "white";
  ctx.stroke();
}

function fireTankBullet(){
    tankBullet__x = tankX + tankWidth/2 ;
    tankBullet__y = canvas.height - tank__bottomOffset;
    drawBullet(tankBullet__x,tankBullet__y);
    moveTankBullet();
    shouldMoveTankBullet = true;
}

function moveTankBullet(){
    if(tankBullet__y < 0){
      shouldMoveTankBullet= false;      
    }

    //if a invader is hit

    for (let i = 0; i < armyRows; i++) {
      for(let j = 0; j < armyColumns; j++){
          let soldier = armyArray[i][j];
          if(
            tankBullet__x > soldier.x &&
            tankBullet__x < soldier.x + invaderWidth &&
            tankBullet__y > soldier.y &&
            tankBullet__y < soldier.y + invaderHeight &&
            soldier.status == 'alive'
          )
          {
            soldier.status='dead';
            shouldMoveTankBullet=false;
            aliveInvaders--;
            score++;            
            explosionColor = "white";
            particlesPerExplosion   = 50;
            particlesMaxSize        = 3;
            triggerExplosion(soldier.x+invaderWidth/2,soldier.y+invaderHeight/2);

            //increase speed

            if((aliveInvaders)%armyColumns==0 && armySpeed > 9){
              armySpeed-=armySpeed__decrement;
              console.log("speed increase: " + armySpeed);
            }
          }
                  
      }
    }  
    //check if a invader is hit by the bullet    

    tankBullet__y -= tankBullet__dy;
}

function drawScoreSeprateLine(){
  ctx.beginPath();
  ctx.beginPath();       
  ctx.moveTo(0, canvas.height- (scoreBarHeight-15));    
  ctx.lineTo(canvas.width, canvas.height - (scoreBarHeight-15)); 
  ctx.lineWidth = 2;
  ctx.shadowBlur = 5;
  ctx.shadowOffsetY=1;
  ctx.shadowOffsetY=-1;
  ctx.shadowColor="red";
  ctx.strokeStyle = "red";
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY=0;
  ctx.shadowOffsetY=0;  
}



function drawBottomMessage(message,sx){
  ctx.beginPath();
  ctx.font = "20px Play";
  ctx.fillStyle="white";
  ctx.fillText(message, sx, canvas.height-10);  
  ctx.closePath();
}
function drawScore(){
  drawBottomMessage("Score: "+score,canvas.width - 90)
}
function drawLives(){
  drawBottomMessage("Lives: "+lives,10)
}

function drawBottomHelper(){
  drawBottomMessage("Press enter to play",150)
}


function drawInvaderBullet(ix, iy){
  ctx.beginPath();
  ctx.beginPath();       
  ctx.moveTo(ix, iy);    
  ctx.lineTo(ix, iy+bullet__height);  
  ctx.lineWidth = bullet__width;
  ctx.strokeStyle = "#FFF";
  ctx.stroke();
}

function drawGameOver(message){
  drawBlinker(function(){ drawScreen__line1("Game Over ") },function(){ drawScreen__line2(message) });
}


function drawBlinker(func1, func2){
  let counter=0;
  startScreenTimeout = setInterval(() => {
    ctx.clearRect(0,0,canvas.width,canvas.height-50);
    func1();
    if(counter%3==0)func2();
    counter++;
  }, 400);
}
  
  function drawStartScreen(){
    drawBlinker(function(){ drawScreen__line1("Space Invaders") },function(){ drawScreen__line2("press enter to play") });
  }



function drawScreen__line1(message){
    ctx.save();
    ctx.beginPath();
    ctx.font = "60px Play";
    ctx.fillStyle="white";
    ctx.textAlign = "center";
    ctx.fillText(message, canvas.width/2,canvas.height/2);  
    ctx.closePath();
    ctx.restore();
}
function drawScreen__line2(message){
    ctx.save();
    ctx.beginPath();
    ctx.shadowBlur = 3;
    ctx.shadowOffsetY=0,5;
    ctx.shadowOffsetY=-0,5;
    ctx.shadowColor="white";
    ctx.fillStyle= "blue";
    ctx.textAlign = "center";
    ctx.font = "40px Play";
    ctx.fillText(message, canvas.width/2,canvas.height/2+60);  
    ctx.closePath();
    ctx.restore();
}





// Draw explosion

function drawExplosion() {

  if (explosions.length === 0) {
    return;
  }

  for (let i = 0; i < explosions.length; i++) {

    const explosion = explosions[i];
    const particles = explosion.particles;

    if (particles.length === 0) {
      explosions.splice(i, 1);
      return;
    }

    const particlesAfterRemoval = particles.slice();
    for (let ii = 0; ii < particles.length; ii++) {

      const particle = particles[ii];

      
      // 

      if (particle.size <= 0) {
        particlesAfterRemoval.splice(ii, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, Math.PI * 2, 0, false);
      ctx.closePath();

      //ctx.fillStyle = 'rgb(' + particle.r + ',' + particle.g + ',' + particle.b + ')';

      ctx.fillStyle = explosionColor;
      ctx.fill();

      // Update

      particle.x += particle.xv;
      particle.y += particle.yv;
      particle.size -= .1;
    }

    explosion.particles = particlesAfterRemoval;

  }

}


// Clicked

function triggerExplosion(triggerX,triggerY) {

  let xPos, yPos;


  xPos = triggerX;
    yPos = triggerY;
  explosions.push(
    new explosion(xPos, yPos)
  );

}

// Explosion

function explosion(x, y) {

  this.particles = [];

  for (let i = 0; i < particlesPerExplosion; i++) {
    this.particles.push(
      new particle(x, y)
    );
  }

}

// Particle

function particle(x, y) {
  this.x    = x;
  this.y    = y;
  this.xv   = randInt(particlesMinSpeed, particlesMaxSpeed, false);
  this.yv   = randInt(particlesMinSpeed, particlesMaxSpeed, false);
  this.size = randInt(particlesMinSize, particlesMaxSize, true);
  this.r    = randInt(113, 222);
  this.g    = '00';
  this.b    = randInt(105, 255);
}


// between the given value

function randInt(min, max, positive) {

  let num;
  if (positive === false) {
    num = Math.floor(Math.random() * max) - min;
    num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
  } else {
    num = Math.floor(Math.random() * max) + min;
  }

  return num;

}


// Optimization for mobile devices

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  fps = 29;
}