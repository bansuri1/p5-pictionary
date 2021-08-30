class instructions{

  constructor(){
    }

  display(){
    noStroke();
  //  fill(200);
  //  rect(800,170,90,20);
    fill(0);
    textSize(15);
    text('Instructions:', 740, 200);
    textSize(10);
    text('Each player can take turns rolling the dice.', 740, 220);

    text('Once you land on a category that you want to draw,', 740,240);
    text('click on the \'ready to draw\' button.', 740, 250);

    text('If you want to skip the category, roll again.', 740, 270);
    text('Keep in mind that you lose a turn if you skip the category.', 740, 280);

    text('You will be prompted with the word you have to draw that the', 740, 300);
    text('other player has to guess. The player who rolled the dice', 740,310);
    text('has to draw. Don\'t worry if you can\'t remember who rolled',740,320);
    text('because the prompt will remind you.', 740,330);

    text('Use the canvas on the left to draw in. Press and hold the mouse', 740, 350);
    text('button to draw. You have 60 seconds to draw.', 740,360);

    text('If the player guesses what you are drawing, click the button', 740,380);
    text('that says \'Guessed it!\'.', 740,390);

    text('If the drawing is guessed successfully, the player',740,410);
    text('who drew will get twice as many points as the guesser.' , 740,420);
    text('More points are rewarded for higher difficulty levels.',740,430 );

    text('Refresh the page if you want to start over. Good luck!', 740, 450);


  }


}
