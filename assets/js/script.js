
var today = $("#currentDay");
var timeRow = $(".time-row");
var schedule = $(".schedule");
var thingsToDoArr = []; //to store todo hour and text property

function runSchedule() {
    //for each time block set time & link object
    timeRow.each(function () {
        var block = $(this);
        var dueTime = parseInt(block.attr("data-hour"));
        //object to hold hour and txt input
        var toDoObj = {
            hour: dueTime,
            text: "",
        }
        //add toDo object to thingsToDo Array
        thingsToDoArr.push(toDoObj);
    });
    //save to local storage
    localStorage.setItem("thingsToDo", JSON.stringify(thingsToDoArr));
    //console.log(thingsToDoArr);
}

// Check Current Time Vs ToDo Time & Update Class Attributes 
var currentHour = moment().format("H");

function blockTimeVsCurrentTime() {
    timeRow.each(function () {
        var block = $(this);
        var currentBlockHr = parseInt(block.attr("data-hour"));

        //update class for style depending on time of day
        if (currentBlockHr == currentHour) { //if block hour is current time
            block.addClass("present").removeClass("past future");
        }
        if (currentBlockHr < currentHour) { // if block hour has passed
            block.addClass("past").removeClass("present future");
        }
        if (currentBlockHr > currentHour) { //if block hour is pending
            block.addClass("future").removeClass("past present");
        }
    });
}

function renderToDoItems() {
    thingsToDoArr = localStorage.getItem("thingsToDo");
    thingsToDoArr = JSON.parse(thingsToDoArr);
    //loop through thingsToDo array, assign text input to the block that matches hour
    //make a variable where [data-hour={hour}] then plug it in to the selector $('[data-hour={hour}')
    for (var i = 0; i < thingsToDoArr.length; i++) {
        var toDoItemHr = thingsToDoArr[i].hour;
        var inputText = thingsToDoArr[i].text;
    // display to do item 
        $("[data-hour=" + toDoItemHr + "]").children("textarea").val(inputText);
    }
    //console.log(thingsToDoArr);
}

// Event handler for Save Button
function saveBtnHandler() {
    var checkHour = $(timeRow).parent().attr("data-hour");
    var addItem = (($(timeRow).parent()).children("textarea")).val();

    //check to update to do item based on the hour of the button clicked
    for (var j = 0; j < thingsToDoArr.length; j++) {
        if (thingsToDoArr[j].hour == checkHour) {
            //set its text to what was added to textarea
            thingsToDoArr[j].text = addItem;
        }
    }
    localStorage.setItem("thingsToDo", JSON.stringify(thingsToDoArr));
    renderToDoItems();
}

// on document load function
var date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

$(document).ready(function () {

    //set up blocks based on time
    blockTimeVsCurrentTime();
    //if there's nothing for the thingsToDo in local storage
    if (!localStorage.getItem("thingsToDo")) {
        //run objects array
        runSchedule();
    } 

    //display today's date
    today.text(date);

    //render scheduled todo items from local storage
    renderToDoItems();

    //save new todo on save button click
    schedule.on("click", "button", saveBtnHandler);

});