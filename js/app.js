//Global Variables
window.secretNum;
window.guessCount=0;

$(document).ready(function(){

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000); 
  	});

		newGame();

		$(".new").click(function(e) {
			//reset text, textbox and button
			$("#feedback").text("Make your guess");
			$("#userGuess").prop("disabled", false);
			$("#guessButton").prop("disabled", false);

			resetCount();
			removeListItems();
			newGame();
		});
});

/*Starts a new game, gets random number, gets the user's guess, and sends
guess and random number to get feedback */
function newGame() {

	window.secretNum = getRandomNumber();

	$("form").submit(function(e) {
		 var inputNumber;

		 e.preventDefault();

		 inputNumber = getInput();

		 //continue on with valid input only
		 if (inputNumber !=-1) {
		 	increaseCount();

		 	addGuessToList(inputNumber);

		 	getFeedback(inputNumber, window.secretNum);
		}

	});
}

/* get and validate user input and returns */
function getInput() {

	guessNum = parseInt($("#userGuess").val());

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

/*Generates a random number between 1 & 100*/
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
		$("#feedback").text("You won! The answer is " + window.secretNum);
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

/** supplies users with a list of the numbers they have guessed so far. **/
function addGuessToList(guess) {
	  $("#guessList").append("<li>" + guess + "</li> ");
}

/** Remove guess list items **/
function removeListItems() {
  if ($("#guessList li").length > 0)
    ($("#guessList li").remove());
}

/**Increases count and displays on screen **/
function increaseCount() {
	window.guessCount++;
	$("#count").text(window.guessCount);
}

/** Resets the counter and resets the text to display on screen **/
function resetCount() {
	window.guessCount=0;
	$("#count").text(window.guessCount);
}
