class boardPiece {

constructor(pieceColor, pieceX, pieceY){
  this.color = pieceColor;
  this.x = pieceX;
  this.y = pieceY;
}

//draw a rectangle at a particular spot

display(){

  stroke(this.color);
  strokeWeight(1);

  if (mouseX > this.x && mouseX < (this.x+120) && mouseY > this.y && mouseY < (this.y+90)){
    fill(0);}
  //  this.color.setAlpha(100);}
    else{
      fill(this.color);
      this.color.setAlpha(255);
    }
  rect(this.x,this.y, 120, 90); //x,y,w,h

}

textDisplay(categoryName, difficultyType){
  noStroke();
  fill(230);
  textSize(10);
  text('Category: ' +categoryName, this.x+5, this.y+75);
  text('Difficulty: ' +difficultyType, this.x +5, this.y+85);
}

textDisplayFirst(){
  fill(255);
  textSize(15);
  text('START', this.x + 35, this.y+20);
  text('FREE SPACE', this.x +12, this.y+85);
}
}
