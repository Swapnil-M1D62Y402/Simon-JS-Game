
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = -1;
var started = false;
var time = 1000;

function playSound(name) {
    var color_sound = new Audio("./sounds/" + name + ".mp3");
    color_sound.play();
}

function nextSequence() {

    userClickedPattern = [];
    level++;

    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);

    $("#level-title").text("Level: " + level);

    $("#" + randomChosenColour).fadeTo(100, 0.1, function () {
        $(this).fadeTo(500, 1.0);
    });
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function startOver() {
    level = -1;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        //console.log("success");
        // console.log(userClickedPattern);
        // console.log(gamePattern);

        //Check if the user has completed the sequence, only then the next game pattern will be called
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
                if (time > 300)      //Set a limit, the minimum time to react
                    time -= 100;     //TO make the game flow faster as levels increases
            }, time);
        }

    }
    else {
        //console.log("Failed");

        var game_over_sound = new Audio("./sounds/wrong.mp3");
        game_over_sound.play();

        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        startOver();
    }
}

$(".btn").on("click", function () {

    var userChosenColor = $(this).attr("id");
    //console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

});

$(document).on("keypress", function () {
    if (!started) {
        nextSequence();
        $("h1").text("Level: " + level);
        started = true;
    }
})


