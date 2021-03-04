var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		})
	}
}

function setupSquares() {
	for(i = 0; i < squares.length; i++) {
	//event listener
	squares[i].addEventListener("click", function() {
			// grab color of picked square
			var clickedColor = this.style.backgroundColor
			// compare color to pickedColor
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeColors(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play again?"
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
}
}

function reset(){
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent ="";
	for(i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
});


function changeColors(color){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	//Math.random returns a number between 0 and 0.9, so we multiply it 
	//for the number of lines we have in the array "colors", so it'll pick one randomly
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = [];
	for(var i = 0; i < num;i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	//pick a red from 0 - 255
	var r =	Math.floor(Math.random() * 256);
	//pick a blue from 0 - 255
	var g =	Math.floor(Math.random() * 256);
	//pick a green from 0 - 255
	var b =	Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}