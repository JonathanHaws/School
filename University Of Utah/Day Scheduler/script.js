// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  
  function createHour(hour, root){
    
    // dynamically display hour and current activity
    var block = $("<div>",{ id: "hour-" + hour}).appendTo(root); 
    if (hour < dayjs().hour()) { block.attr("class","row time-block past") } 
    if (hour == dayjs().hour()) { block.attr("class","row time-block present") }
    if (hour > dayjs().hour()) { block.attr("class","row time-block future") }
    if (hour > 11) { var time = " PM";} else { var time = " AM";}
    $("<div>",{ class: "col-2 col-md-1 hour text-center py-3"}).text((hour-((hour > 12)*12))+time).appendTo(block);
    var textarea = $("<textarea>",{ class: "col-8 col-md-10 description", rows: "3"}).text(localStorage.getItem("hour-"+hour)).appendTo(block);
    var button = $("<button>",{ class: "btn saveBtn col-2 col-md-1"}).attr("aria-label","save").appendTo(block);
    var save = $("<i>",{ class: "fas fa-save"}).attr("aria-hidden","true").appendTo(button);

    // create listener to save new activity if save button is clicked
    save.click(function(){ localStorage.setItem("hour-" + hour, textarea.val())});

  }

  $("#currentDay").text(dayjs().format("dddd MMMM D")); // display current time 

  var root = document.body.childNodes[1];
  createHour(9, root);
  createHour(10, root);
  createHour(11, root);
  createHour(12, root);
  createHour(13, root);
  createHour(14, root);
  createHour(15, root);
  createHour(16, root);
  createHour(17, root);
  createHour(18, root);
  createHour(19, root);
  createHour(20, root);
  createHour(21, root);

});
