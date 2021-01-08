var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on('keydown', function () {
    if (!started) {


        $("#level-title").text('Level' + level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentlevel) {
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {

        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
        else {
            console.log("no problem click again and again until you get it correct or wrong!!");
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("wrong");
        $("#level-title").text("Press any key to play again");
        setTimeout(function () {
            $("body").removeClass("wrong");
        }, 100);
        startOver();
    }

}

function nextSequence() {

    userClickedPattern = [];

    level++;
    $('h1').text('Level ' + level);



    var randomNo = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNo];
    gamePattern.push(randomColor);

    //adding flash to button using jQuery
    $("#" + randomColor).fadeOut(100).fadeIn(100);

    //adding sound to buttons
    playSound(randomColor);


}


$('.btn').on('click', function () {

    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatedPress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);



})

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();

}

function animatedPress(currentColor) {
    $("#" + currentColor).addClass('pressed');
    setTimeout(function () {
        $("#" + currentColor).removeClass('pressed');
    }, 100);

}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;

}










