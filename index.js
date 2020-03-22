var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var gameLevel = 0;

$("body").keydown(function (){
  if(gameLevel == 0){
    nextButton();
  }
})

$(".btn").click(function(){
  var userColor = $(this).attr("id");

  userPattern.push(userColor);
  playSound(userColor);
  animatePress(userColor);

  checkAnswer(userPattern.length - 1);
});

function nextButton()
{
  gameLevel += 1;
  userPattern = [];
  $("#level-title").text("Level " + gameLevel);
  var randomNumber = Math.round(Math.random()*3);

  var randomColor = buttonColors[randomNumber];

  gamePattern.push(randomColor);

  $("#" + randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function checkAnswer(currentLevel)
{
  if(userPattern[currentLevel] === gamePattern[currentLevel]){
    if(userPattern.length === gamePattern.length)
      {
        setTimeout(nextButton, 1000);
      }
    }
  else{
    gameOver();
  }
}

function gameOver(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key To Continue");
  gamePattern = [];
  gameLevel = 0;
}

function playSound(color)
{
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color)
{
  $("#" + color).addClass("pressed");

  setTimeout(function (){
    $("#" + color).removeClass("pressed");
  },100)
}
