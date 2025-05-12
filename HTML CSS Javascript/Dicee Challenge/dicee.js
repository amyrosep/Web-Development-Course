
// Register event listeners
document.getElementById("btnPlay").addEventListener("click", onBtnClick);
var diceSources = ["images/dice1.png", "images/dice2.png", "images/dice3.png",
                    "images/dice4.png", "images/dice5.png", "images/dice6.png"];

//Button click listener
function onBtnClick()
{
  var playerOneNum;
  var playerTwoNum;
  var winnerHeader = document.getElementById("winnerHeader");

  playerOneNum = Math.floor(Math.random() * 6) + 1;
  playerTwoNum = Math.floor(Math.random() * 6) + 1;

  if(playerOneNum > playerTwoNum)
  {
    winnerHeader.innerHTML = "🚩 Player One Wins!";
  }
  else if(playerTwoNum > playerOneNum)
  {
    winnerHeader.innerHTML = "Player Two Wins! 🚩";
  }
  else
  {
    winnerHeader.innerHTML = "It's a Tie!";
  }

  setDiceImages(playerOneNum, playerTwoNum);
}

function setDiceImages(playerOneNum, playerTwoNum)
{
  var player1Element = document.getElementById("playerOneDie");
  var player2Element = document.getElementById("playerTwoDie");
  var dieOne = diceSources[playerOneNum -1];
  var dieTwo = diceSources[playerTwoNum -1];

  player1Element.setAttribute("src", dieOne);
  player2Element.setAttribute("src", dieTwo);
}
