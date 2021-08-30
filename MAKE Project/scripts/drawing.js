class drawingBoard {

	constructor(xLocation, yLocation, pxLocation, pyLocation){
this.x = xLocation;
this.y = yLocation;
this.px = pxLocation;
this.py = pyLocation;
	}

	display(){
		stroke(0);
		noFill();
	  rect(250,170,310,290);
	}

	startDraw(){

	strokeWeight(5);
	fill(0);
	stroke(0);
	line(this.x, this.y, this.px, this.py);
		//ellipse(pmouseX, pmouseY, 3);
	}

}




//function setup() {
 //	createCanvas(600, 600);
	//colorPicker = createColorPicker('#000000');
	//penColor = color(0,0,0);
//}

//function draw(){
// background(255);stroke(0);
//rect(250,170,310,290);
// }

//function mouseDragged()
//{
//	strokeWeight(10);
//	stroke(penColor);
//	line(mouseX, mouseY, pmouseX, pmouseY);
//}
