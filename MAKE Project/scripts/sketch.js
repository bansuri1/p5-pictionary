/// FINAL MAKE PROJECT - BANSURI AGARWAL //


// ****-- VARIABLES --**** //

// -- BOARD SQUARES --//

var leftColumn = new Array(5);
var topRow = new Array(6);
var rightColumn = new Array(5);
var bottomRow = new Array(6);

// X/Y coordinates for squares (starting points)

var LCx = 120; // left column, also for entire board
var LCy = 70;

var TRx = LCx + 130; // top row
var TRy = LCy;

var RCx = (10 * (topRow.length + 1)) + (120 * (topRow.length + 1)) + LCx; // right column
var RCy = LCy;

var BRx = TRx; // bottom row
var BRy = LCy + (90 * (leftColumn.length - 1)) + (10 * (leftColumn.length - 1));

// -- DICE --//

var diceButton;
var diceRolls = 0; // value of dice roll

//XY coordinates and width/height for dice

var diceX = 615;
var diceY = 275;
var diceW = 60;
var diceH = 60;

var dotS = 10; // dot size

// -- CHARACTER TOKENS -- //

var playerOne;
var blocksCoveredP1 = 1; // which block is the player on (1-22)
var playerOneNum = 1;

var playerTwo;
var blocksCoveredP2 = 1; // which block is the player on (1-22)
var playerTwoNum = 2;

var playerOnesTurn = true;
var playerRolling = 1; // whose turn is it to roll
var playerDrawing = 2; // whose turn is it to draw
var diceHasRolled = false;

// -- player scores -- //

var player1Score = 0;
var player2Score = 0;

// -- player one x/y -- //

var p1x = LCx + 30;
var p1y = LCy + 45;

var initialp1x = p1x; // starting x point for p1
var initialp1y = p1y; // starting y point for p1

// -- player two x/y -- //

var p2x = LCx + 90;
var p2y = LCy + 45;

var initialp2x = p2x; // starting x point for p2
var initialp2y = p2y; // starting y point for p2


// -- CATEGORIES -- //
var category; // for displaying on board
var difficulty;

var category1; // for pop up alerts
var difficulty1;
var difficultyWeight = 1; // multiplier for difficulty

// -- game logic -- //

var drawTime;
var readyToDraw;
var randomWord;
var displayDrawingBoard = false;

var drawingCanvas = []; // empty array to draw
var resetButton;

var timeLeft = 60;
var startTimer = false;
var timerIsDone = true;

var instruction; // instructions
var correctButton; // if player guessed correctly

// -------------------------------------------------------------- //

function setup() {
  createCanvas(windowWidth, windowHeight);

//-- Buttons --//

  diceButton = createButton('Roll the Dice');
  diceButton.position(diceX - 18, diceY - 35);
  diceButton.mousePressed(rollTheDice);

  readyToDraw = createButton('Ready to draw!');
  readyToDraw.position(diceX - 22, diceY + 90);
  readyToDraw.mousePressed(timeToDraw);

  resetButton = createButton('Erase Canvas');
  resetButton.position(457, 435);
  resetButton.mousePressed(resetCanvas);

  correctButton = createButton('Guessed it!');
  correctButton.position(252,172);
  correctButton.mousePressed(guessedCorrect);

//-- calling objects --//

  playerOne = new piece(p1x, p1y, color(random(255), random(255), random(255)), playerOneNum);
  playerTwo = new piece(p2x, p2y, color(random(255), random(255), random(255)), playerTwoNum);

  drawTime = new drawingTurn();

  instruction = new instructions();


  setInterval(countDown, 1000); // timer counts down every one second

// -- creating board squares -- //

  for (var i = 0; i < leftColumn.length; i++) {
    blockColor = color(random(0, 200), random(0, 200), random(0, 200));
    leftColumn[i] = new boardPiece(blockColor, LCx, LCy);
    LCy = LCy + 100;
  }

  for (var j = 0; j < topRow.length; j++) {
    blockColor = color(random(0, 200), random(0, 200), random(0, 200));
    topRow[j] = new boardPiece(blockColor, TRx, TRy);
    TRx = TRx + 130;
  }

  for (var k = 0; k < rightColumn.length; k++) {
    blockColor = color(random(0, 200), random(0, 200), random(0, 200));
    rightColumn[k] = new boardPiece(blockColor, RCx, RCy);
    RCy = RCy + 100;
  }

  for (var l = 0; l < bottomRow.length; l++) {
    blockColor = color(random(0, 200), random(0, 200), random(0, 200));
    bottomRow[l] = new boardPiece(blockColor, BRx, BRy);
    BRx = BRx + 130;
  }
}

// -------------------------------------------------------------- //

function draw() {

  background(255);
  dice();
  instruction.display();

  //--  name/credits --//
  textSize(12);
  text('MAKE Project: Bansuri Agarwal', windowWidth-250,windowHeight-25);
  text('Think.Code.Make, Spring 2020', windowWidth-250, windowHeight-12);

  //-- drawing canvas --//

  stroke(0);
  noFill();
  rect(250, 170, 310, 290); // drawing canvas rectangle

  if (mouseX > 250 && mouseX < 310 + 250 && mouseY > 170 && mouseY < 170 + 290 && mouseIsPressed) { // if mouse is in canvas
    drawingCanvas.push(new drawingBoard(mouseX, mouseY, pmouseX, pmouseY));
  }

  for (let q = 0; q < drawingCanvas.length; q++) {
    drawingCanvas[q].startDraw();
    if (mouseX < 250 && mouseX > 310 + 250 && mouseY < 170 && mouseY > 170 + 290) { // if mouse is outside canvas
      drawingCanvas[q].splice(q);
    }
  }

  // -- creating board squares -- //

  // note: categories and difficulty levels were manually typed in
  // so that I could customize the order in which they appeared.

  for (var i = 0; i < leftColumn.length; i++) {
    leftColumn[i].display();
    if (i != 0) {
      leftColumn[i].textDisplay(category, difficulty);
    } else {
      leftColumn[i].textDisplayFirst(); // different text alignment for 1st square
    }
    if (i == 1) {
      category = 'Food';
      difficulty = 'Easy';
    }
    if (i == 2) {
      category = 'Animals';
      difficulty = 'Medium';
    }
    if (i == 3) {
      category = 'Internet';
      difficulty = 'Hard';
    }
    if (i == 4) {
      category = 'Music';
      difficulty = 'Easy';
    }
    if (i > 4) {
      category = '';
      difficulty = '';
    }
  }
  for (var j = 0; j < topRow.length; j++) {
    topRow[j].display();
    topRow[j].textDisplay(category, difficulty);
    if (j == 0) {
      category = 'Emory';
      difficulty = 'Medium';
    }
    if (j == 1) {
      category = 'Music';
      difficulty = 'Medium';
    }
    if (j == 2) {
      category = 'Actions';
      difficulty = 'Hard';
    }
    if (j == 3) {
      category = 'Nature';
      difficulty = 'Easy';
    }
    if (j == 4) {
      category = 'Food';
      difficulty = 'Medium';
    }
    if (j == 5) {
      category = 'Music';
      difficulty = 'Hard';
    }
    if (j > 5) {
      category = '';
      difficulty = '';
    }
  }
  for (var k = 0; k < rightColumn.length; k++) {
    rightColumn[k].display();
    rightColumn[k].textDisplay(category, difficulty);
    if (k == 0) {
      category = 'Internet';
      difficulty = 'Medium';
    }
    if (k == 1) {
      category = 'Animals';
      difficulty = 'Hard';
    }
    if (k == 2) {
      category = 'Places';
      difficulty = 'Easy';
    }
    if (k == 3) {
      category = 'Nature';
      difficulty = 'Medium';
    }
    if (k == 4) {
      category = 'Places';
      difficulty = 'Medium';
    }
    if (k > 4) {
      category = '';
      difficulty = '';
    }
  }
  for (var l = 0; l < bottomRow.length; l++) {
    bottomRow[l].display();
    bottomRow[l].textDisplay(category, difficulty);
    if (l == 0) {
      category = 'Places';
      difficulty = 'Hard';
    }
    if (l == 1) {
      category = 'Food';
      difficulty = 'Hard';
    }
    if (l == 2) {
      category = 'Actions';
      difficulty = 'Medium';
    }
    if (l == 3) {
      category = 'Nature';
      difficulty = 'Hard';
    }
    if (l == 4) {
      category = 'Internet';
      difficulty = 'Easy';
    }
    if (l == 5) {
      category = 'Emory';
      difficulty = 'Hard';
    }
    if (l > 5) {
      category = '';
      difficulty = '';
    }
  }

  // -- adding players -- //

  playerOne.display(p1x, p1y);
  playerTwo.display(p2x, p2y);

//-- creating timer --//

  noStroke();
  fill(230  );
  rect(590, 170, 100, 20);
  fill(255,0,0);
  textSize(10);
  if (timeLeft != 0) {
    text('Time remaining: ' + timeLeft + 's', 595, 183);
  }
  if (timeLeft == 0) {
    timerIsDone = true;
    alert('Time up');
    timeLeft = 60;
    startTimer = false;
  }

  //-- creating scoreboard --//

  noFill();
  strokeWeight(1);
  stroke(0);
  rect(diceX - 30, diceY + 125, 120, 60);
  noStroke();
  textSize(15);
  fill(0);
  text('SCORES', diceX, diceY + 140);
  text('Player 1: ' + player1Score, diceX - 10, diceY + 160);
  text('Player 2: ' + player2Score, diceX - 10, diceY + 175);

}

// -------------------------------------------------------------- //

function dice() { // this function creates the physical appearance of the dice
  fill(255);
  stroke(0, 0, 0);
  strokeWeight(2);
  rect(diceX, diceY, diceW, diceH);
  fill(30);
  noStroke();
  textSize(15);
  text('You rolled a ' + diceRolls, diceX - 15, diceY + 80);
  textSize(15);
  text('Player ' + playerRolling + '\'s turn', diceX - 20, diceY - 60);
  text('to roll.', diceX + 10, diceY - 45);

  //--- dice dots ---//

  if (diceRolls == 1) {
    fill(0);
    ellipse(diceX + (diceW / 2), diceY + (diceH / 2), dotS, dotS);
  }

  if (diceRolls == 2) {
    fill(0);
    ellipse(diceX + (diceW / 4), diceY + (diceH / 4), dotS, dotS);
    ellipse(diceX + (diceW * (3 / 4)), diceY + (diceH * (3 / 4)), dotS, dotS);
  }

  if (diceRolls == 3) {
    fill(0);
    ellipse(diceX + (diceW / 4), diceY + (diceH / 4), dotS, dotS);
    ellipse(diceX + (diceW / 2), diceY + (diceH / 2), dotS, dotS);
    ellipse(diceX + (diceW * (3 / 4)), diceY + (diceH * (3 / 4)), dotS, dotS);
  }

  if (diceRolls == 4) {
    fill(0);
    ellipse(diceX + (diceW / 4), diceY + (diceH / 4), dotS, dotS);
    ellipse(diceX + (diceW / 4), diceY + (diceH * (3 / 4)), dotS, dotS);
    ellipse(diceX + (diceW * (3 / 4)), diceY + (diceH * (3 / 4)), dotS, dotS);
    ellipse(diceX + (diceW * (3 / 4)), diceY + (diceH / 4), dotS, dotS);
  }

  if (diceRolls == 5) {
    fill(0);
    ellipse(diceX + (diceW / 4), diceY + (diceH / 4), dotS, dotS);
    ellipse(diceX + (diceW / 4), diceY + (diceH * (3 / 4)), dotS, dotS);
    ellipse(diceX + (diceW / 2), diceY + (diceH / 2), dotS, dotS);
    ellipse(diceX + (diceW * (3 / 4)), diceY + (diceH * (3 / 4)), dotS, dotS);
    ellipse(diceX + (diceW * (3 / 4)), diceY + (diceH / 4), dotS, dotS);
  }

  if (diceRolls == 6) {
    fill(0);
    ellipse(diceX + (diceW / 4), diceY + (diceH / 4), dotS, dotS);
    ellipse(diceX + (diceW / 4), diceY + (diceH * (1 / 2)), dotS, dotS);
    ellipse(diceX + (diceW / 4), diceY + (diceH * (3 / 4)), dotS, dotS);

    ellipse(diceX + (diceW * (3 / 4)), diceY + (diceH * (3 / 4)), dotS, dotS);
    ellipse(diceX + (diceW * (3 / 4)), diceY + (diceH * (1 / 2)), dotS, dotS);
    ellipse(diceX + (diceW * (3 / 4)), diceY + (diceH / 4), dotS, dotS);
  }
}

// -------------------------------------------------------------- //

function rollTheDice() { // this function tells the program what to do after a player rolls the dice

  if (!startTimer) { // make sure timer is not running
    diceHasRolled = true;
    diceRolls = int(random(1, 7));

    //--- Decide which player's turn it is --//
    if (playerOnesTurn) {
      playerOneTurn();
    } else {
      playerTwoTurn();
    }
  }


  if (startTimer) { // if timer is running, show player an alert
    alert('Wait for player ' + playerDrawing + ' to finish drawing.');
  }
}

// -------------------------------------------------------------- //

function playerOneTurn() { // this function tells player 1 how to move

  blocksCoveredP1 = blocksCoveredP1 + diceRolls; // blocksCovered notes the 'ID' of the square that the player is on
  if (blocksCoveredP1 > 22) { // if the player passes the first square, reset blocksCovered
    blocksCoveredP1 = blocksCoveredP1 - 22;
  }

  // -- telling the pieces where they should move -- //

  if (blocksCoveredP1 >= 1 && blocksCoveredP1 <= 8) { // if top row
    p1x = initialp1x + ((blocksCoveredP1 - 1) * 130);
    p1y = initialp1y; // y position is fixed
    console.log('Player One is on block ' + blocksCoveredP1);
  }

  if (blocksCoveredP1 >= 9 && blocksCoveredP1 <= 12) { // if right column
    p1x = RCx + 30; // x position is fixed
    p1y = initialp1y + ((blocksCoveredP1 - 8) * 100);
    console.log('Player One is on block ' + blocksCoveredP1);
  }

  if (blocksCoveredP1 >= 13 && blocksCoveredP1 <= 19) { // if bottom row
    p1y = BRy + 45; // y position is fixed
    p1x = ((19 - blocksCoveredP1) * 130) + LCx + 30;
    console.log('Player One is on block ' + blocksCoveredP1);
  }

  if (blocksCoveredP1 >= 20 && blocksCoveredP1 <= 22) { // if left column
    p1x = LCx + 30; // x position is fixed
    p1y = ((23 - blocksCoveredP1) * 100) + initialp1y;
    console.log('Player One is on block ' + blocksCoveredP1);
  }

  playerOnesTurn = false; // switch to player 2
  if (timerIsDone) {
    playerRolling = 2;
  }
  playerDrawing = 1;

}

// -------------------------------------------------------------- //

function playerTwoTurn() { // this function tells player 2 how to move
  blocksCoveredP2 = blocksCoveredP2 + diceRolls;  // blocksCovered notes the 'ID' of the square that the player is on
  if (blocksCoveredP2 > 22) { // if the player passes the first square, reset blocksCovered
    blocksCoveredP2 = blocksCoveredP2 - 22;
  }

  // -- telling the pieces where they should move -- //

  if (blocksCoveredP2 >= 1 && blocksCoveredP2 <= 8) { // if top row
    p2x = initialp2x + ((blocksCoveredP2 - 1) * 130);
    p2y = initialp2y; // y position is fixed
    console.log('Player Two is on block ' + blocksCoveredP2);
  }

  if (blocksCoveredP2 >= 9 && blocksCoveredP2 <= 12) { // if right column
    p2x = RCx + 90; // x position is fixed
    p2y = initialp2y + ((blocksCoveredP2 - 8) * 100);
    console.log('Player Two is on block ' + blocksCoveredP2);
  }

  if (blocksCoveredP2 >= 13 && blocksCoveredP2 <= 19) { // if bottom row
    p2y = BRy + 45; // y position is fixed
    p2x = ((19 - blocksCoveredP2) * 130) + LCx + 90;
    console.log('Player Two is on block ' + blocksCoveredP2);
  }

  if (blocksCoveredP2 >= 20 && blocksCoveredP2 <= 22) { // if left column
    p2x = LCx + 90; // x position is fixed
    p2y = ((23 - blocksCoveredP2) * 100) + initialp2y;
    console.log('Player Two is on block ' + blocksCoveredP2);
  }
  if (timerIsDone) {
    playerRolling = 1;
  }
  playerDrawing = 2;
  playerOnesTurn = true;
}

// -------------------------------------------------------------- //

function timeToDraw() { // this function tells the program what to do if the 'ready to draw' button is pressed
  if (diceHasRolled) {

    // --- Individual Categories for each square --- //

    if ((blocksCoveredP1 == 2 && playerDrawing == 1) || (blocksCoveredP2 == 2 && playerDrawing == 2)) {
      category1 = 'Music';
      difficulty1 = 'Easy';
      difficultyWeight = 1; catType = easyMusic;
    }
    if ((blocksCoveredP1 == 3 && playerDrawing == 1) || (blocksCoveredP2 == 3 && playerDrawing == 2)) {
      category1 = 'Emory';
      difficulty1 = 'Medium';difficultyWeight = 2; catType = mediumEmory;
    }
    if ((blocksCoveredP1 == 4 && playerDrawing == 1) || (blocksCoveredP2 == 4 && playerDrawing == 2)) {
      category1 = 'Music';
      difficulty1 = 'Medium'; difficultyWeight = 2;catType = mediumMusic;
    }
    if ((blocksCoveredP1 == 5 && playerDrawing == 1) || (blocksCoveredP2 == 5 && playerDrawing == 2)) {
      category1 = 'Actions';
      difficulty1 = 'Hard';
      difficultyWeight = 3;catType = hardActions;
    }
    if ((blocksCoveredP1 == 6 && playerDrawing == 1) || (blocksCoveredP2 == 6 && playerDrawing == 2)) {
      category1 = 'Nature';
      difficulty1 = 'Easy';difficultyWeight = 1; catType = easyNature;
    }
    if ((blocksCoveredP1 == 7 && playerDrawing == 1) || (blocksCoveredP2 == 7 && playerDrawing == 2)) {
      category1 = 'Food';
      difficulty1 = 'Medium';difficultyWeight = 2;catType = mediumFood;
    }
    if ((blocksCoveredP1 == 8 && playerDrawing == 1) || (blocksCoveredP2 == 8 && playerDrawing == 2)) {
      category1 = 'Music';
      difficulty1 = 'Hard';difficultyWeight = 3;catType = hardMusic;
    }
    if ((blocksCoveredP1 == 9 && playerDrawing == 1) || (blocksCoveredP2 == 9 && playerDrawing == 2)) {
      category1 = 'Internet';
      difficulty1 = 'Medium'; difficultyWeight = 2;catType = mediumInternet;
    }
    if ((blocksCoveredP1 == 10 && playerDrawing == 1) || (blocksCoveredP2 == 10 && playerDrawing == 2)) {
      category1 = 'Animals';
      difficulty1 = 'Hard';difficultyWeight = 3;catType = hardAnimals;
    }
    if ((blocksCoveredP1 == 11 && playerDrawing == 1) || (blocksCoveredP2 == 11 && playerDrawing == 2)) {
      category1 = 'Places';
      difficulty1 = 'Easy';difficultyWeight = 1;catType = easyPlaces;
    }
    if ((blocksCoveredP1 == 12 && playerDrawing == 1) || (blocksCoveredP2 == 12 && playerDrawing == 2)) {
      category1 = 'Nature';
      difficulty1 = 'Medium';difficultyWeight = 2;catType = mediumNature;
    }
    if ((blocksCoveredP1 == 13 && playerDrawing == 1) || (blocksCoveredP2 == 13 && playerDrawing == 2)) {
      category1 = 'Internet';
      difficulty1 = 'Easy';difficultyWeight = 1; catType = easyInternet;
    }
    if ((blocksCoveredP1 == 14 && playerDrawing == 1) || (blocksCoveredP2 == 14 && playerDrawing == 2)) {
      category1 = 'Nature';
      difficulty1 = 'Hard';difficultyWeight = 3;catType = hardNature;
    }
    if ((blocksCoveredP1 == 15 && playerDrawing == 1) || (blocksCoveredP2 == 15 && playerDrawing == 2)) {
      category1 = 'Actions';
      difficulty1 = 'Medium';difficultyWeight = 2;catType = mediumActions;
    }
    if ((blocksCoveredP1 == 16 && playerDrawing == 1) || (blocksCoveredP2 == 16 && playerDrawing == 2)) {
      category1 = 'Food';
      difficulty1 = 'Hard';difficultyWeight = 3;catType = hardFood;
    }
    if ((blocksCoveredP1 == 17 && playerDrawing == 1) || (blocksCoveredP2 == 17 && playerDrawing == 2)) {
      category1 = 'Places';
      difficulty1 = 'Hard'; difficultyWeight = 3;catType = hardPlaces;
    }
    if ((blocksCoveredP1 == 18 && playerDrawing == 1) || (blocksCoveredP2 == 18 && playerDrawing == 2)) {
      category1 = 'Places';
      difficulty1 = 'Medium'; difficultyWeight = 2;catType = mediumPlaces;
    }
    if ((blocksCoveredP1 == 19 && playerDrawing == 1) || (blocksCoveredP2 == 19 && playerDrawing == 2)) {
      category1 = 'Internet';
      difficulty1 = 'Hard'; difficultyWeight = 3;catType = hardInternet;
    }
    if ((blocksCoveredP1 == 20 && playerDrawing == 1) || (blocksCoveredP2 == 20 && playerDrawing == 2)) {
      category1 = 'Animals';
      difficulty1 = 'Medium';difficultyWeight = 2;catType = mediumAnimals;
    }
    if ((blocksCoveredP1 == 21 && playerDrawing == 1) || (blocksCoveredP2 == 21 && playerDrawing == 2)) {
      category1 = 'Food';
      difficulty1 = 'Easy'; difficultyWeight = 1;catType = easyFood;
    }
    if ((blocksCoveredP1 == 22 && playerDrawing == 1) || (blocksCoveredP2 == 22 && playerDrawing == 2)) {
      category1 = 'Emory';
      difficulty1 = 'Hard'; difficultyWeight = 3;catType = hardEmory;
    }

    randomWord = catType[catIndex]; // finds the corresponding list in wordList.js
    catIndex = int(random(0,catType.length)); // retrieves a random word from a list stored in wordList.js

    drawTime.popUp(playerDrawing, category1, difficulty1, randomWord); // popup alert tells the player what to draw
    startTheTimer(); // timer begins
    displayDrawingBoard = true;
    diceHasRolled = false;


  } else { // if the player tries to draw without rolling the dice, they are given an alert
    alert('Roll the dice first.');
  }
}

// -------------------------------------------------------------- //

function resetCanvas() { // erases the canvas
  drawingCanvas = [];
}

// -------------------------------------------------------------- //

function countDown() { // timer counts down each second
  if (startTimer) {
    if (timeLeft > 0) {
      timeLeft--;
    }
  }
}

// -------------------------------------------------------------- //

function startTheTimer() { // game logic tells the program if the timer is running or not
  timerIsDone = false;
  startTimer = true;
}

// -------------------------------------------------------------- //

function guessedCorrect(){ // tells the program what to do if the 'guessed it' button is pressed
  timerIsDone = true; // reset timer, but don't start
  startTimer = false;
  timeLeft = 60;

  if (playerDrawing == 1){ // gives P1 twice as many points as P2
    player1Score = player1Score + (2* difficultyWeight); // points are weighted by difficulty
    player2Score = player2Score + (1* difficultyWeight);
  }

  if (playerDrawing == 2){ // gives P2 twice as many points as P1
    player1Score = player1Score +(1* difficultyWeight);
    player2Score = player2Score +(2* difficultyWeight);
  }
}
