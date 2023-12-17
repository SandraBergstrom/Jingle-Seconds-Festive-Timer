import getTimeDifference from "./countdownLocalized";

const url = window.location.search.split(".")[0];

let countryCode;

switch (url) {
  case "/greece":
    countryCode = ["Europe", "Istanbul"];
    break;
  case "/india":
    countryCode = ["Europe", "Kolkata"];
    break;
  case "/ireland":
    countryCode = ["Europe", "London"];
    break;
  case "/japan":
    countryCode = ["Asia", "Toyko"];
    break;
  case "/poland":
    countryCode = ["Europe", "Warsaw"];
    break;
  case "/spain":
    countryCode = ["Europe", "Paris"];
    break;
  default:
    countryCode = ["Europe", "London"];
    break;
}

document.addEventListener("DOMContentLoaded", function () {
  setInterval(function () {
    let daysElement = document.getElementById("days");
    let hoursElement = document.getElementById("hours");
    let minutesElement = document.getElementById("minutes");
    let secondsElement = document.getElementById("seconds");
    let time = getTimeDifference(countryCode[0], countryCode[1]);
    daysElement.innerHTML = `${time.days}`;
    hoursElement.innerHTML = `${time.hours}`;
    minutesElement.innerHTML = `${time.minutes}`;
    secondsElement.innerHTML = `${Math.trunc(time.seconds)}`;
  }, 1000);
});
