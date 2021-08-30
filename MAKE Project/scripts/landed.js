class drawingTurn {

  constructor(){
    this.rw = randomWord;
  }

  popUp(playerNum, category, difficulty, randomW){
    alert("Time to draw, player "+playerNum+". Your category is "+category+ " and the difficulty is "+difficulty+". Click on <<OK>> when you are ready to view your word.");
    alert('"***(Make sure the other player isn\'t looking.)***');
    alert("You have one minute to draw: "+randomW);
    }

}
