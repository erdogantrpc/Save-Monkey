var myObstacles = [];

function startGame() {
    myGameArea.start();
    monkey = new monkey(100, 100, "monkey.png", 580, 580, "image");
    
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        setInterval(drawObstacle, 450);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
          })
          window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
          })
    },
    clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
      clearInterval(this.interval);
    }
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}


function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
      }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
    ctx = myGameArea.context;
    if (type == "image") {
      this.y += 2;
        ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width, this.height);
          
        } else {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

}

function drawObstacle(){
  
  var x = Math.floor(Math.random() * (myGameArea.canvas.width -30));
      console.log(11);
  minHeight = 20;
  maxHeight = 50;
  height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
  myObstacles.push(new component(20, 60, "bomb.png", x, height, "image"));

}
function monkey(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
      }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function(){
    ctx = myGameArea.context;
    if (type == "image") {
        ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width, this.height);
        } else {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
  this.stayInside = function () {
    if (this.x > 900) {
        this.x = 900;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 500) {
        this.y = 500;
    }
    if (this.y < 0) {
        this.y = 0;
    }
}
}

function reloadPage()
 {
  window.location.reload()
 }

  function updateGameArea() {
    myGameArea.clear();
    myObstacles.forEach(function(item,i){
      item.update();
      if(monkey.crashWith(item)){
        alert('Üzülme, Tekrar denemeye ne dersin?')
        myGameArea.stop();
        reloadPage();
      }
    });
    monkey.speedX = 0;
    monkey.speedY = 0;
    monkey.stayInside();
    if (myGameArea.key && myGameArea.key == 37) {monkey.speedX = -8; }
    if (myGameArea.key && myGameArea.key == 39) {monkey.speedX = 8; }
    if (myGameArea.key && myGameArea.key == 38) {monkey.speedY = -8; }
    if (myGameArea.key && myGameArea.key == 40) {monkey.speedY = 8; }
    monkey.newPos();
    monkey.update();
}