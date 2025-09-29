let circleX, circleY, diameter;
let gravity, Yvelocity, Xvelocity;
let hoopX, hoopY, score, clicks;
let activeCircle;
let ballName, ballColor;
let clickedPos;
let showDrag = false;
let gotPoint = false;

function setup() {
  angleMode(DEGREES);
  canvasW = windowWidth - 1;
  canvasH = windowHeight;
  createCanvas(canvasW, canvasH + 1);
  background(240);
  frameRate(60);
  circleX = 10;
  circleY = 10;
  diameter = 15;
  gravity = 0;
  Yvelocity = 0;
  Xvelocity = 0;
  hoopX = 50;
  hoopY = 300;
  score = 0;
  clicks = 0;
  activeCircle = 0;
  ballName = "";
  ballColor = "";
  ballInit(circles[0]);
  clickedPos = [0, 0];
}

const circles = [
  ["Normal Ball", 255, 25 / 60], //ensure the denominator is the framerate
];

function ballInit(choice) {
  ballName = choice[0];
  ballColor = choice[1];
  gravity = choice[2];
}

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function mousePressed() {
  showDrag = true;
  clickedPos = [mouseX, mouseY];
  clicks++;
} //add a slow motion effect by slowing down the ball's velocity when being dragged

function mouseReleased() {
  showDrag = false;
  releasedPos = [mouseX, mouseY];
  console.log(releasedPos);
  Xvelocity = (clickedPos[0] - releasedPos[0]) / 20;
  Yvelocity = (clickedPos[1] - releasedPos[1]) / 20;
  if (
    abs(clickedPos[0] - releasedPos[0]) >=
    20 * abs(clickedPos[1] - releasedPos[1])
  ) {
    Xvelocity *= 1.5;
    console.log("X boost");
  } else if (
    abs(clickedPos[0] - releasedPos[0]) * 20 <=
    abs(clickedPos[1] - releasedPos[1])
  ) {
    Yvelocity *= 1.5;
    console.log("Y boost");
  }
}

function draw() {
  background(240);
  if (circleY + diameter / 2 + Yvelocity >= canvasH) {
    if (canvasH - circleY + (Yvelocity - diameter / 2) < 1) {
      circleY = canvasH - diameter / 2;
      Yvelocity = 0;
      Xvelocity -= Xvelocity / 60;
    } else {
      Yvelocity = (Yvelocity - diameter / 3) * -1;
    }
  }

  if (circleX + diameter / 2 > canvasW) {
    circleX = circleX - canvasW;
  } else if (circleX - diameter / 2 < 0) {
    circleX = circleX + canvasW;
  }

  if (circleY < 0) {
    fill(color(255, 0, 0));
    circle(circleX, 10, max(10 - abs(circleY / 100), 5));
    console.log(max(10 - abs(circleY / 500), 5));
  }
  fill(0);
  fill(ballColor);
  circle(circleX, circleY, diameter);
  //hoopity
  fill(200, 100, 20);
  rect(hoopX, hoopY, 100, 25);
  if (
    circleX > hoopX &&
    circleX < hoopX + 100 &&
    circleY > hoopY &&
    circleY < hoopY + 25
  ) {
    gotPoint = true;
  }
  if (gotPoint == true) {
    score++;
    hoopX = getRandomInt(0, canvasW - 100);
    hoopY = getRandomInt(50, canvasH - 25); //50 is arbitrary blank space
    gotPoint = false;
  }

  if (showDrag === true) {
    let distance = sqrt(
      sq(clickedPos[0] - mouseX) + sq(clickedPos[1] - mouseY)
    );
    temp = floor(distance / 20);
    yOffset = (mouseY - clickedPos[1]) / temp;
    xOffset = (mouseX - clickedPos[0]) / temp;
    for (let i = 1; i <= temp; i++) {
      let greenVal = 255 / 7;
      fill(color(255, 255 - greenVal * i, 50));
      circle(clickedPos[0] + xOffset * i, clickedPos[1] + yOffset * i, 15);
    }
  }
  
  fill(0);
  textFont("Arial", 25);
  text("Score: " + score, 5, 30);
  text("Clicks: " + clicks, 5, 55);
  textSize(20);
  circleY += Yvelocity;
  circleX += Xvelocity;
  Yvelocity += gravity;
}
