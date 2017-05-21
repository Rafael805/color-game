var numSquares = 6;
var colors = [];
var pickedColor;
var colorDisplay = document.getElementById("colorDisplay"); // RGB
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");

init();

function init() {
        setUpModeButtons();
        setUpSquares();
        reset();
}

function setUpModeButtons() {
        // MODE BUTTONS EVENT LISTENERS
        for(var i  = 0; i < modeButtons.length; i++) {
                modeButtons[i].addEventListener("click", function() {
                        modeButtons[0].classList.remove("selected");
                        modeButtons[1].classList.remove("selected");
                        this.classList.add("selected");
                        // Ternary operator
                        this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
                        reset();
                });
        }
}

function setUpSquares() {
        // Loops through the number of squares
        for (var i = 0; i < squares.length; i++) {
                // Add click listeners to squares
                squares[i].addEventListener("click", function() {

                        // Grab color of clicked square to use when comparing
                        var clickedColor = this.style.backgroundColor;

                        // Compare color to pickedColor
                        if (clickedColor === pickedColor) {
                                messageDisplay.textContent = "Correct!";
                                resetButton.textContent = "Play Again?";
                                changeColors(clickedColor);
                                h1.style.backgroundColor = clickedColor;

                        }

                        else {
                                this.style.backgroundColor = "#232323";
                                messageDisplay.textContent = "Try again";
                        }
                });
        }
}


function reset() {
        // Generate all new random colors depending on the numSquares variable
        colors = generateRandomColors(numSquares);
        // Pick a new random color from array
        pickedColor = pickColor();
        // Change colorDisplay to match picked color
        colorDisplay.textContent = pickedColor;

        resetButton.textContent = "New Colors";
        messageDisplay.textContent = "" ;

        /* Ex: If easy button is clicked, you have an array of three items. Looping through six squares and checking if there is a color that matches that square. For the first three there will be so the background color is set to be the color from the array. But the last three color[i] will be undefined so that is false. We then set the display to be none. */
        for (var i = 0; i < squares.length; i++) {
                if(colors[i]) {
                        squares[i].style.display = "block";
                        squares[i].style.backgroundColor = colors[i];
                }
                else {
                        squares[i].style.display= "none";
                }
        }

        h1.style.backgroundColor = "steelblue";
}


// RESET BUTTON
resetButton.addEventListener("click", function() {
        reset();
});


/* Function with a parameter of color which is used about to change the color to the clicked color. */
function changeColors(color) {
        // Loop through  all squares
        for (var i = 0; i < squares.length; i++) {
                // Change each color to math given color
                squares[i].style.backgroundColor = color;
        }
}

/* Function to pick a random color. Math.random generates a random number from 0 to 1 and we multiply it by the length of colors and add one to it to get the value we want. */
function pickColor() {
        var random = Math.floor(Math.random() * colors.length);
        return colors[random];
}


/* This function generates n number of random colors. An empty array is created and looped through n number of times. Used the push function to add a randomColor to arr */
function generateRandomColors(num) {
        // Add num random colors to an array
        var arr = [];
        // Repeat num times
        for(var i = 0; i < num; i++) {
                // Get random color and push into array
                arr.push(randomColor());
        }
        // Return the arr
        return arr;
}

/* This function generates a random number for the red, blue, and green values */
function randomColor() {
        // Pick a "red" from 0 to 255
        var r = Math.floor(Math.random( ) * 256);
        // Pick a "green" from 0 to 255
        var g = Math.floor(Math.random( ) * 256);
        // Pick a "blue" from 0 to 255
        var b = Math.floor(Math.random( ) * 256);

        // Return the random rgb number
        return "rgb(" + r + ", " + g + ", " + b + ")";
}
