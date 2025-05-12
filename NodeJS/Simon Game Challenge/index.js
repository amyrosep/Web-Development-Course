// Global Variables - I know, I should use OOP. Bite me.
var currentLevel = 0;
var pattern = [];
var userPattern = [];
var btnMap = new Map();
btnMap.set(0, $("#green"));
btnMap.set(1, $("#red"));
btnMap.set(2, $("#yellow"));
btnMap.set(3, $("#blue"));

// Register Event Handlers
$(document).keydown(onKeyDown);
$(".btn").click(onBtnClick);


// Event Handlers
function onKeyDown() {
  if(currentLevel === 0)
  {
    setTimeout(incrementLevel, 100);
  }
}

function onBtnClick(event) {
  userPattern.push($(event.target));
  var userLength = userPattern.length;
  var patternLength = pattern.length;

  //Did the user press the right button?
  //If so continue the game
  if(userButtonCheck(userPattern[userLength - 1])) {
    //If the user has done the whole pattern correctly:
    if(patternLength === userLength)
    {
      //Increment with a delay so that the user has time to process the new button
      setTimeout(incrementLevel, 800);
    }
  }
  //Uh oh, user done lost.
  else {
    userLost(event.target);
  }
}

// Game state updates
function incrementLevel() {
  //Housekeeping
  currentLevel++;
  userPattern = [];

  //Update game state
  addToPattern();

  //Update UI
  $("h1").text("Level " + currentLevel);
  nextPatternButton(pattern[currentLevel-1], true);
}

function addToPattern() {
  //Generate # 0-3 for the next button in the pattern
  var nextButtonIndex = Math.floor(Math.random() * 4);
  pattern.push(btnMap.get(nextButtonIndex));
}

function userLost(btn) {
  var userButton = userPattern[userPattern.length - 1];

  //Clean up game state
  pattern = [];
  userPattern = [];

  //Update UI
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  buttonPressEffects(userButton, false);
  //Revert the background on a delay
  setTimeout(revertBackground, 300);
  currentLevel = 0;
}

//Game validations
function userButtonCheck(pressedButton) {
  var patternButton = pattern[userPattern.length - 1];

  if(patternButton.attr("id") === pressedButton.attr("id"))
  {
    buttonPressEffects(pressedButton, true);
    return true;
  }
  return false;
}

//Animations

function buttonPressEffects(jqBtn, correctBtn)
{
  var soundEffect;
  jqBtn.addClass("pressed");

  if(correctBtn)
  {
    var btnColor = jqBtn.attr("id");
    soundEffect = new Audio("sounds/" + btnColor + ".mp3");
  }
  else {
    soundEffect = new Audio("sounds/wrong.mp3");
    soundEffect.volume = 0.5;
  }
  soundEffect.play();
  setTimeout(revertButton, 200, jqBtn);
}

function nextPatternButton(btn)
{
  var btnColor = btn.attr("id");
  soundEffect = new Audio("sounds/" + btnColor + ".mp3");
  soundEffect.play();
  btn.fadeTo(0, 0.25).delay(200).fadeTo(0, 1);
}

function revertBackground()
{
  $("body").removeClass("game-over");
}

function revertButton(jqBtn)
{
  jqBtn.removeClass("pressed");
}
