// Initial variables
var gameOn = false;
var colors = ["green", "red", "yellow", "blue"];
var gameArray = [];
var playerArray = [];
var level = 0;

// Asign the pressed class to all buttons
$(".btn").each(function () {
    $(this).click(function () {
        // Visual FeedBack
        $(this).addClass("pressed");
        setTimeout(() => {
            $(this).removeClass("pressed")
        }, 120);

        // Sound feedback
        if (gameOn) {
            // Asign correct sound
            soundBtn($(this).attr("id"));
            playerArray.push($(this).attr("id"));

            // debug
            // alert("game:" + gameArray + "\n" + "player:" + playerArray)
            // alert(gameArray.toString() === playerArray.toString());

            // If player array is less than game, check for the initial ones.
            // Implements this so the player don't wait until completing the array 
            // to know is wrong.
            if (playerArray.length < gameArray.length) {
                if (!sameArray(playerArray, gameArray)) {
                    // Change Title
                    $("h1").text("Game Over, Press Any Key to Restart");
                    gameOver();
                };

                return;
            };

            if (gameArray.toString() === playerArray.toString()) {
                playerArray = [];
                gameOn = false;
                simon();
            } else {
                // Change Title
                $("h1").text("Game Over, Press Any Key to Restart");
                gameOver();
            };
        } else {
            gameOver();
        };
    });
});

// Call game pressing a key
$(document).on("keydown", simon);


// FUNCTIONS
function simon() {
    // Don't work again if already in game
    if (gameOn) {
        return;
    };
    // Start Game
    gameOn = true;

    // Show Level
    level++;
    $("#level-title").text("Level " + level)

    // random number
    var random = Math.floor(Math.random() * 4);

    // sleep time to be more friendly :)
    window.setTimeout(() => {
        // show button
        $("#" + colors[random]).fadeOut();
        $("#" + colors[random]).fadeIn();
        soundBtn(colors[random]);

        // Add random color to game array
        gameArray.push(colors[random]);
    }, 350);
};

function soundBtn(color) {
    var btnAudio = new Audio("sounds/" + color + ".mp3");
    btnAudio.play();
};

function gameOver() {
    // Set variables to initial
    gameOn = false;
    gameArray = [];
    playerArray = [];
    level = 0;

    // Asign wrong sound
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    // Change Background
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 120);
};

function sameArray(arr1, arr2) {
    var equal = true;
    for (var i = 0; i < arr1.lenght; i++) {
        if (arr1[i] != arr2[i]) {
            equal = false
        };
    };
    return equal;
};