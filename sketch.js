var foodStock
var dogSprite
var foodStockref
var dogImage, dogHappy
var database

function preload(){
  dogImage = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup(){
  createCanvas(500, 500);
  database = firebase.database();
  dogSprite = createSprite(200,200,10,10);
  dogSprite.addImage(dogImage);
  dogSprite.scale = 1/3;
  foodStockref = database.ref('Food');
  foodStockref.on("value",function(data){
    foodStock = data.val();
    console.log(foodStock);
  });
}


function draw(){  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    console.log(foodStock);
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
  if(foodStock>=0){
  text("Food:" + " " + foodStock,250,120);
  }else{
    text("Food:" + " " + 0,250,120);
  }
}

function readStock(data){
  console.log("InsidereadStock")
  foodStock=data.val();
  console.log(foodStock);
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