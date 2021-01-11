
var today = $("#currentDay");
//var timeRow = $(".time-row");
var schedule = $(".schedule");
var thingsToDo = []; //to store todo hour and text properties

function runSchedule() {
    //for each time block set time & link object
    $(".time-row").each(function () {
        var dueTime = parseInt($(this).attr("data-hour")); //√√√√√
        //object to hold hour and txt input
        var toDoObj = {
            hour: dueTime,
            text: "",
        }
        //add toDo object to thingsToDo Array
        thingsToDo.push(toDoObj);
    });
    //save to local storage
    localStorage.setItem("ToDos", JSON.stringify(thingsToDo));
    console.log(thingsToDo);
}

// Check Current Time Vs ToDo Time & Update Class Attributes 
var currentHour = moment().format("H");

function blockTimeVsCurrentTime() { 
    $(".time-row").each(function () {
        var currentBlockHr = parseInt($(this).attr("data-hour")); // √√√√√

        //update class for style depending on time of day
        if (currentBlockHr == currentHour) { //if timeRow hour is current time
            $(this).addClass("present").removeClass("past future"); // √√√√√
        }
        if (currentBlockHr < currentHour) { // if timeRow hour has passed
            $(this).addClass("past").removeClass("present future"); // √√√√√
        }
        if (currentBlockHr > currentHour) { //if timeRow hour is pending
            $(this).addClass("future").removeClass("past present"); // √√√√√
        }
    });
}



function renderToDoItems() {
    thingsToDo = localStorage.getItem("ToDos");
    thingsToDo = JSON.parse(thingsToDo);
    //loop through thingsToDo array, assign text input to the block that matches hour
    for (var i = 0; i < thingsToDo.length; i++) {
        var toDoItemHr = thingsToDo[i].hour;
        var inputText = thingsToDo[i].text;
    // display to do item 
        $("[data-hour=" + toDoItemHr + "]").children("textarea").val(inputText); // √√√√√
    }
}

// Event handler for Save Button     √√√√√
function saveBtnHandler() {
    var thisBlock = $(".time-row")
    var checkHour = $(thisBlock).parent().attr("data-hour");
console.log(thisBlock)
    var addItem = (($(thisBlock).parent()).children("textarea")).val();

    //check to update to do item based on the hour of the button clicked
    for (var j = 0; j < thingsToDo.length; j++) {
        if (thingsToDo[j].hour == checkHour) {
            //set its text to what was added to textarea
            thingsToDo[j].text = addItem;
        }
    }
    localStorage.setItem("ToDos", JSON.stringify(thingsToDo));
    renderToDoItems();
}

// on document load function
var date = moment().format("MMMM Do YYYY, h:mm:ss a");

$(document).ready(function () {

    //set up blocks based on time
    blockTimeVsCurrentTime();
    //if there's nothing for the thingsToDo in local storage
    if (!localStorage.getItem("ToDos")) {
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

