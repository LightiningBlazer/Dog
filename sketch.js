var foodStock
var dogSprite
var foodS
var dogImage, dogHappy
var database

function preload(){
  dogImage = loadImage("images/dogImg.png");
  dagHappy = loadImage("images/dogImg1.png");
}

function setup(){
  createCanvas(500, 500);
  database = firebase.database();
  var dogSprite = createSprite(200,200,10,10);
  dogSprite.addImage(dogImage);
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw(){  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dogSprite.addImage(dogHappy);
    foodStock = foodStock - 1
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke("black");
  text("Press up to feed the dog!",250,100);
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}