const url = "wss://chantel-websocket-server.glitch.me/";

const connection = new WebSocket(url);


connection.onopen = () => {
  //connection.send('hey11 ') ;
  console.log("connected to " + url + " WebSocket server");
};

connection.onerror = (error) => {
  console.log("received error   ");
  console.log(`WebSocket error:  ${error}`);
};

connection.onmessage = (e) => {
  console.log("received message  ");
  //console.log("log:" + e.data);

  var message = JSON.parse(e.data);

  //check if we have valid message
  if (message != undefined) {
    playerData = message;
  }
};

var myPlayerName = "Chantel";

//arrary to store the coordiantes of all players
//var players = {}; // empty array

var playerData = {
  xCircle: 10,
  yCircle: 0,
  xSquareLeft: 50,
  ySquareLeft: 90,
  xSquareRight: 250,
  ySquareRight: 90,
  rectHight: 50,
  rectWidth: 5,
  xIncrement: 1,
  yIncrement: 1,
  counterLeft: 0,
  counterRight: 0,
  secondPlayerKeyCode: "",
};

function setup() {
  createCanvas(320, 260);
}

function draw() {
  background(0);

  // Draw the secondPlayerKeyCode
  fill(255);
  textSize(16);
  textAlign(CENTER);
  //wtext(secondPlayerKeyCode, width / 2, height - 4);

  ellipseMode(CENTER);
  ellipse(playerData.xCircle, playerData.yCircle, 30);

  //draw rectangle with counterLeft text
  rect(
    playerData.xSquareLeft,
    playerData.ySquareLeft,
    playerData.rectWidth,
    playerData.rectHight
  );
  text(
    "#: " + playerData.counterLeft,
    playerData.xSquareLeft,
    playerData.ySquareLeft
  );

  //draw rectangle with counterRight text
  rect(
    playerData.xSquareRight,
    playerData.ySquareRight,
    playerData.rectWidth,
    playerData.rectHight
  );
  text(
    "#: " + playerData.counterRight,
    playerData.xSquareRight,
    playerData.ySquareRight
  );

  playerData.xCircle =
    playerData.xCircle + playerData.xIncrement * random(0.9, 1.3); //add some
  playerData.yCircle = playerData.yCircle + playerData.yIncrement;

  //ball thit left (0) or the right (width) -> change x drirection
  if (playerData.xCircle < 0 || playerData.xCircle > width) {
    playerData.xIncrement = playerData.xIncrement * -1;
  }

  //ball thit top (0) or the bottom (height) -> change y drirection
  if (playerData.yCircle > height || playerData.yCircle < 0) {
    playerData.yIncrement = playerData.yIncrement * -1;
  }

  //check if the ball hit the rectangle
  if (
    playerData.xCircle > playerData.xSquareLeft - playerData.rectWidth &&
    playerData.xCircle < playerData.xSquareLeft + playerData.rectWidth &&
    playerData.yCircle < playerData.ySquareLeft + playerData.rectHight * 1.5 && // adjust for bottom hight
    playerData.yCircle > playerData.ySquareLeft - playerData.rectHight
  ) {
    //change x direction after vertical collision
    playerData.xIncrement = playerData.xIncrement * -1;

    //incease collision counterLeft
    playerData.counterLeft = playerData.counterLeft + 1;
  }

  //check if the ball hit the rectangle
  if (
    playerData.xCircle > playerData.xSquareRight - playerData.rectWidth &&
    playerData.xCircle < playerData.xSquareRight + playerData.rectWidth &&
    playerData.yCircle < playerData.ySquareRight + playerData.rectHight * 1.5 && // adjust for bottom hight
    playerData.yCircle > playerData.ySquareRight - playerData.rectHight
  ) {
    //change x direction after vertical collision
    playerData.xIncrement = playerData.xIncrement * -1;

    //incease collision counterLeft
    playerData.counterRight = playerData.counterRight + 1;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    //up move
    playerData.ySquareLeft =
      playerData.ySquareLeft - 5 * abs(playerData.yIncrement);
    if (playerData.ySquareLeft < 10) {
      playerData.ySquareLeft = 10;
    }
  } else if (keyCode === DOWN_ARROW) {
    playerData.ySquareLeft =
      playerData.ySquareLeft + 5 * abs(playerData.yIncrement);
    if (playerData.ySquareLeft > height - playerData.rectHight) {
      playerData.ySquareLeft = height - playerData.rectHight;
    }
  } else if (keyCode === LEFT_ARROW) {
    playerData.ySquareRight =
      playerData.ySquareRight - 5 * abs(playerData.yIncrement);
    if (playerData.ySquareRight < 10) {
      playerData.ySquareRight = 10;
    }
  } else if (keyCode === RIGHT_ARROW) {
    playerData.ySquareRight =
      playerData.ySquareRight + 5 * abs(playerData.yIncrement);
    if (playerData.ySquareRight > height - playerData.rectHight) {
      playerData.ySquareLeft = height - playerData.rectHight;
    }
  }

  //convert Json property to string
  var messageKey = JSON.stringify(playerData);

  //send message to other players with Publisher
  connection.send(messageKey);
  //publishMessage(messageKey);
}

