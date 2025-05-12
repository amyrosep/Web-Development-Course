var drumSounds = new Map();
drumSounds.set("w", "sounds/tom-1.mp3");
drumSounds.set("a", "sounds/tom-2.mp3");
drumSounds.set("s", "sounds/tom-3.mp3");
drumSounds.set("d", "sounds/snare.mp3");
drumSounds.set("j", "sounds/crash.mp3");
drumSounds.set("k", "sounds/kick-bass.mp3");
drumSounds.set("l", "sounds/tom-4.mp3");

var drumButtons = document.getElementsByClassName("drum");
for(var i = 0; i < drumButtons.length; i++)
{
  drumButtons[i].addEventListener("click", handleClick);
}

document.addEventListener("keydown", onKeyDown);

function handleClick() {
  makeSound(this.innerHTML);
  buttonAnimation(this.innerHTML);
}

function onKeyDown(keyEvent) {
  makeSound(keyEvent.key);
  buttonAnimation(keyEvent.key);
}

function makeSound(key) {
  if(drumSounds.has(key))
  {
    var sound = new Audio(drumSounds.get(key));
    sound.play();
  }
}

function buttonAnimation(currentKey) {
  var elements = document.getElementsByClassName(currentKey);
  if(elements.length > 0)
  {
    elements[0].classList.add("pressed");
    setTimeout(function() {elements[0].classList.remove("pressed")}, 100);
  }
}
