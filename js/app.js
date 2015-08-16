$(document).ready(function(){

  var secretNum = getRandomNumber();
  var guessCount=0;

	/*--- Display information modal box ---*/
  $(".what").click(function(){
  $(".overlay").fadeIn(1000);
	});

  /*--- Hide information modal box ---*/
  $("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  });

  /*Start a new game when user clicks new game */
  $(".new").click(function(e) {
		newGame();
  });

  /*Resets text, buttons, list, count, and gets a new random number */
  function newGame() {

    secretNum=getRandomNumber();
    guessCount=0;

    $("#feedback").text("Make your guess");
    $("#count").text(guessCount);
    $("#userGuess").prop("disabled", false);
    $("#guessButton").prop("disabled", false);
    $("#guessList li").remove();
  }

  /*Get data when submitted from the form and sends it to be processed further*/
  $("form").submit(function(e) {

    e.preventDefault();

    var inputNumber;
    inputNumber = getInput();

    //continue on with valid numeric input only
    if (inputNumber !=-1) {

      //increase count and display
      guessCount++;
      $("#count").text(guessCount);

      //add guess to list
      $("#guessList").append("<li>" + inputNumber + "</li> ");

      //send input and random number to determine proper feedback to show
      getFeedback(inputNumber, secretNum);
    }
  });

  /* get and validate user input and returns */
  function getInput() {

  	guessNum = parseInt($("#userGuess").val());
    console.log("User guess:" + guessNum);

  	if (guessNum >= 1 && guessNum <= 100){
  		$("#userGuess").val('');
  		return guessNum;
  	}

  	else {
  		$("#feedback").text("Please be sure to enter a valid number");
  		$("#userGuess").val('');
  		return -1;
  	}
  }

  /*Generates a random number between 1 & 100 and returns it*/
  function getRandomNumber(){
  	var randomNum;
  	var min= 1;
  	var max= 100;

  	randomNum = Math.floor((Math.random() * max) + min);
  	console.log("Random number is: " + randomNum);

  	return randomNum;
  }

  /**The user gets feedback about each guess to help them figure out what the random
  generated number is */
  function getFeedback(guess, answer) {

  	var previousGuess = $("#guessList li").last().prev().text();
  	var guessDifference = Math.abs(guess-answer);

  	//game over so disables textbox and button
  	if (guessDifference==0) {
  		$("#feedback").text("You won! The answer is " + secretNum);
  		$("#userGuess").prop("disabled", true);
  	  $("#guessButton").prop("disabled", true);
  	}

  	/*previous guess exists so bases hint on last given guess.
  	This was suggested as a more advanced feature */
  	else if($.isNumeric(previousGuess)) {
  		var previousDifference = Math.abs(previousGuess-answer);

  		if(guessDifference > previousDifference)
  			$("#feedback").text("Colder");
  		else
  			$("#feedback").text("Warmer");
  	}

  	//This executes on the user's first guess only
  	else {
  		if(guessDifference >= 50)
  			$("#feedback").text("Ice Cold");

  		else if(guessDifference > 30 && guessDifference < 50)
  			$("#feedback").text("Cold");

  		else if(guessDifference > 20 && guessDifference <= 30)
  			$("#feedback").text("Warm");

  		else if(guessDifference > 10 && guessDifference <= 20)
  				$("#feedback").text("Hot");

  		else if(guessDifference >= 1 && guessDifference <=10)
  				$("#feedback").text("Very Hot");
  	}
  }
});
