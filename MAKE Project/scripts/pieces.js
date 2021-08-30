class piece {

		constructor(bPieceX, bPieceY, bPieceColor, playerNum){
		this.c = bPieceColor;
		this.p = playerNum;
		}

	display(bPieceX, bPieceY){
		fill(this.c);
		stroke(255);
		ellipse(bPieceX,bPieceY, 35,35);
		fill(255);
		noStroke();
		textSize(15);
		text(+this.p,bPieceX-4,bPieceY+5);
	}


}
