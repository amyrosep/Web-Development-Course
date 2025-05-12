$("button").click(onClick);
$(document).keydown(onKeyDown);
$("h1").on("click", onMouseOver)


function onClick(){
  $("h1").fadeToggle();
}

function onKeyDown(event) {
  $("h1").text(event.key);
}

function onMouseOver()
{
  $("h1").css("color", "purple");
}
