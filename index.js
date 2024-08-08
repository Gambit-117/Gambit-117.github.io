// Global var declarations

var gamePattern = [];
var buttonColors = ["red", "blue", "yellow", "green"];
var audio = new Audio('./sounds/boop.mp3');
var gameOverAudio = new Audio('./sounds/gameOver.mp3');
var userClickedPattern = [];
var start = true;
var level = 0;

// Game Sequence generator 

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    $(".change-me").text("Level: " + level);
}

// Critical functions

function continuePlay() {
    userClickedPattern = [];
    nextSequence();
    showAnimate();
}

function checkArrays() {
    return userClickedPattern.length === gamePattern.length;
}

// Game Over
function gameOver() {
    $(".change-me").text("Game Over! You made it to level " + level);
    $("body").addClass("gameOver");
    setTimeout(function() {
        $("body").removeClass("gameOver");
    }, 200);
    $(".game-over").removeClass("hide-me");
    gameOverAudio.play();
    $(document).off();
    $(".button").off();
}


// Play animations

function showAnimate() {
    for (let i = 0; i < gamePattern.length; i++) {
        (function (i) {
            let randomChosenColor = gamePattern[i];
            let speed;

            // Faster animation as game gets harder 

            if (gamePattern.length < 4) {
                speed = 400;
            } else if (gamePattern.length < 8) {
                speed = 200;
            } else {
                speed = 150;
            }

            // Decreased Delay for faster animations
            let delay = i * speed * 3 * (1 - gamePattern.length / 20);
            delay = Math.max(0, delay); // No delay below 0

            setTimeout(function() {
                $("#" + randomChosenColor).fadeIn(speed, "linear").fadeOut(speed, "linear").fadeIn(speed, "linear");
                playSound();
            }, delay);
        })(i);
    }
}

// Play Sound

function playSound() {
    audio.currentTime = 0;
    audio.play();
}

// Button clicker

$(".button").on("click", function() {
    let userButton = this.id;
    userClickedPattern.push(userButton);
    let speed = 200;
    $(this).fadeIn(speed, "linear").fadeOut(speed, "linear").fadeIn(speed, "linear");
    playSound();
    checkAnswer(userClickedPattern.length -1);
})

// Start game loop
$(document).on("keydown", function () {
    if (start = true) {
        start = false;
        continuePlay();
    } else { return; }
});

// Continue game loop
function checkAnswer(currentLevelIndex) {
    if (userClickedPattern[currentLevelIndex] === gamePattern[currentLevelIndex]) {
        if (checkArrays()) {
            setTimeout(continuePlay, 1000);
        } else {
            console.log("Keep going");
        }
    } else {
        gameOver();
    }
}
