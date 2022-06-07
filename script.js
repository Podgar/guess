let started = false;
let finished = false;
let number;
let score;
let highScore = 0;

let animInterval;
let animFading = true;
let animAppear = false;
let animOpacity = 1;
let animFinished = true;

const playBtn = document.getElementById("playBtn");
const numGuess = document.getElementById("numGuess");
const numInput = document.getElementById("numInput");
const checkBtn = document.getElementById("checkBtn");
const feedback = document.getElementById("feedback");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

numInput.disabled = true;

playBtn.addEventListener("click", function(){
	playBtn.textContent = "AGAIN";
	started = true;
	finished = false;
	numGuess.textContent = "?";
	displayMessage("<<< Guess");
	numInput.value = "";

	number = Math.trunc(Math.random() * 100) + 1;
	score = 10;
	scoreText.textContent = String(score).padStart(2, 0);
	numInput.disabled = false;
	numInput.focus();
});

checkBtn.addEventListener("click", function(){
	if(!started) {
		displayMessage("Press START!");
		return;
	}

	if(finished) {
		displayMessage("Play Again!");
		return;
	}

	let guess = Number(numInput.value);

	numInput.focus();

	if(guess < 1 || guess > 100) {
		displayMessage("Enter Number");
		return;
	}


	if(score <= 0) {

		finished = true;
		numInput.disabled = true;
		displayMessage("You Lost!");
		return;
	}

	if(guess < number) { //Higher

		reduceScore();
		displayMessage("Higher!");

	} else if (guess > number) { //Lower

		reduceScore();
		displayMessage("Lower!");

	} else {

		finished = true;
		numInput.disabled = true;
		displayMessage("Right!");
		numGuess.textContent = number;
		if(score > highScore) {
			highScore = score;
			highScoreText.textContent = String(highScore).padStart(2, 0);
			displayMessage("Right! Record!");
		}
	}

});

numInput.addEventListener("input", function(){
	let guess = Number(numInput.value);
	if(guess < 1) {
		numInput.value = ""
	} else if (guess > 100) {
		numInput.value = "";
	}
});

function reduceScore() {
	score--;
	scoreText.textContent = String(score).padStart(2, 0);
	numInput.value = "";
}

function displayMessage(newMessage) {

	if(!animFinished) {
		console.log("stop");
		return;
	}

	animFinished = false;

	animInterval = setInterval(function() {

		if(animFading) {
			animOpacity -= 0.1
		}

		if(animAppear) {
			animOpacity += 0.1
		}

		animOpacity = Math.round(animOpacity * 10) / 10
		feedback.style.opacity = animOpacity;

		if(animOpacity <= 0) {
			animFading = false;
			animAppear = true;
			feedback.textContent = newMessage;
		}

		if(animOpacity >= 1) {
			animFinished = true;
			animFading = true;
			animAppear = false;
			clearInterval(animInterval);
		}
	}, 20);

}