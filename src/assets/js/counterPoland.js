import getTimeDifference from "./countdownLocalized";

document.addEventListener("DOMContentLoaded", function () {
  setInterval(function () {
    let daysElement = document.getElementById("days");
    let hoursElement = document.getElementById("hours");
    let minutesElement = document.getElementById("minutes");
    let secondsElement = document.getElementById("seconds");
    let time = getTimeDifference("Europe", "Warsaw");
    daysElement.innerHTML = `${time.days}`;
    hoursElement.innerHTML = `${time.hours}`;
    minutesElement.innerHTML = `${time.minutes}`;
    secondsElement.innerHTML = `${Math.trunc(time.seconds)}`;
  }, 1000);
});
