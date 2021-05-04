let time = new Date();

// get the local time of both Seattle and Boston
const SEATTLE_TIME = time.toLocaleTimeString("en-US", {timeZone: "America/Los_Angeles"});
const BOSTON_TIME = time.toLocaleTimeString("en-US", {timeZone: "America/New_York"});

const TIME_DIFFERENCE = 3;
const CONVERT_TO_DEGREES = 6;
const HOURS_TO_DEGREES_INITIAL = 30;
const HOURS_TO_DEGREES_TRANSITION = 0.5;
const SECONDS_CYCLE = 60;
const MINUTE_CYCLE = 60;
const HOUR_CYCLE = 12;

// get the AM-PM for both the locations
var seattleAP = SEATTLE_TIME.slice(-2);
var bostonAP = BOSTON_TIME.slice(-2);

var seattle = SEATTLE_TIME.split(":");

// get the common minutes and seconds and separate hours for both the locations
var seconds = Number(seattle[2].slice(0,2));
var minutes = Number(seattle[1]);
var seattleHour = Number(seattle[0]);
var bostonHour = Number(seattleHour + TIME_DIFFERENCE);

// translate the hour into proper degrees for the hour hands
var seattleHourDegrees = (seattleHour*HOURS_TO_DEGREES_INITIAL) + (minutes*HOURS_TO_DEGREES_TRANSITION);
var bostonHourDegrees = (bostonHour*HOURS_TO_DEGREES_INITIAL) + (minutes*HOURS_TO_DEGREES_TRANSITION);

// update the AM PM divs
document.getElementById("seattle").getElementsByClassName("am-pm")[0].innerHTML = seattleAP;
document.getElementById("boston").getElementsByClassName("am-pm")[0].innerHTML = bostonAP;

// update the initial time
document.getElementById("seattle").getElementsByClassName("second")[0].style.transform = "translate(100px) rotate(" + (seconds*CONVERT_TO_DEGREES).toString() + "deg)";
document.getElementById("boston").getElementsByClassName("second")[0] .style.transform = "translate(100px) rotate(" + (seconds*CONVERT_TO_DEGREES).toString() + "deg)";

document.getElementById("seattle").getElementsByClassName("minute")[0].style.transform = "translate(100px) rotate(" + (minutes*CONVERT_TO_DEGREES).toString() + "deg)";
document.getElementById("boston").getElementsByClassName("minute")[0] .style.transform = "translate(100px) rotate(" + (minutes*CONVERT_TO_DEGREES).toString() + "deg)";

document.getElementById("seattle").getElementsByClassName("hour")[0].style.transform = "translate(100px) rotate(" + seattleHourDegrees.toString() + "deg)";
document.getElementById("boston").getElementsByClassName("hour")[0] .style.transform = "translate(100px) rotate(" + bostonHourDegrees.toString() + "deg)";

// functions to call when the timer starts

/**
 * Set the seconds hand of both the clocks, moving by 6 degrees with every tick/second.
 * The setMinutes() and setHours() is called every 60 seconds.
 */
function setSeconds() {
    seconds += 1;
    if(seconds % SECONDS_CYCLE == 0) {
        setMinutes();
        setHours();
        seconds = 0;
    }
    document.getElementById("seattle").getElementsByClassName("second")[0].style.transform = "translate(100px) rotate(" + (seconds*CONVERT_TO_DEGREES).toString() + "deg)";
    document.getElementById("boston").getElementsByClassName("second")[0] .style.transform = "translate(100px) rotate(" + (seconds*CONVERT_TO_DEGREES).toString() + "deg)";
}

/**
 * Set the minute hand of both the clocks.
 */
function setMinutes() {
    minutes += 1;
    if (minutes % MINUTE_CYCLE == 0){
        minutes = 0;
        updateHour();
    }
    document.getElementById("seattle").getElementsByClassName("minute")[0].style.transform = "translate(100px) rotate(" + (minutes*CONVERT_TO_DEGREES).toString() + "deg)";
    document.getElementById("boston").getElementsByClassName("minute")[0] .style.transform = "translate(100px) rotate(" + (minutes*CONVERT_TO_DEGREES).toString() + "deg)";
}

/**
 * Set the hour hand of both the clocks, moving by half a degree every minute.
 */
function setHours() {
    seattleHourDegrees += HOURS_TO_DEGREES_TRANSITION;
    bostonHourDegrees += HOURS_TO_DEGREES_TRANSITION;
    document.getElementById("seattle").getElementsByClassName("hour")[0].style.transform = "translate(100px) rotate(" + (seattleHourDegrees).toString() + "deg)";
    document.getElementById("boston").getElementsByClassName("hour")[0] .style.transform = "translate(100px) rotate(" + (bostonHourDegrees).toString() + "deg)";
}

/**
 * Update the hour and flip the AM and PM when the hour hand completes a cycle.
 */
function updateHour(){
    seattleHour += 1;
    bostonHour += 1;
    if (seattleHour % HOUR_CYCLE == 0) {
        document.getElementById("seattle").getElementsByClassName("am-pm")[0].innerHTML = flipAmPm(seattleAP);
        
    }
    if (bostonHour % HOUR_CYCLE == 0) {
        document.getElementById("boston").getElementsByClassName("am-pm")[0].innerHTML = flipAmPm(bostonAP);
        
    }
}

/**
 * Flips to the other period of the clock cycle.
 * AM if it was PM and vice versa.
 * @param amPm 
 * @returns the other period
 */
function flipAmPm(amPm) {
    if (amPm == "AM"){
        return "PM"
    }
    return "AM"
}

// start the timer
setInterval(setSeconds, 1000);




