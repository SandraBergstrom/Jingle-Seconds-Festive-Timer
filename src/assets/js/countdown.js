import getTimeDifference from "./countdownLocalized";
import countryData from "../../lib/data.json";

const newYearDate = new Date("Jan 1, 2024 00:00:00").getTime();

const flagElement = document.getElementById("flag");
const selectedCountryElement = document.getElementById("selectedCountry");
const selectedCountryText = document.getElementById("text-element");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function setUpTimer(dstOffset) {
  const x = setInterval(function () {
    const currentTime = Date.now();
    const totalOffsetMilliseconds = dstOffset * 1000;
    const now = new Date(currentTime + totalOffsetMilliseconds);

    const offsetMinutes = now.getTimezoneOffset();

    now.setMinutes(now.getMinutes() + offsetMinutes);

    // Calculate the remaining time
    const distance = newYearDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("countdown").innerHTML = "Happy New Year!";
    }
  }, 1000);
}

const x = setInterval(function () {
  const now = new Date();

  const offsetMinutes = now.getTimezoneOffset();

  now.setMinutes(now.getMinutes() + offsetMinutes);

  // Calculate the remaining time
  const distance = newYearDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "Happy New Year!";
  }
}, 1000);

// Converts location into lat.lng
export async function getCurrentLocationLatLng() {
  try {
    const position = await getCurrentLocation();
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    return { lat, lng };
  } catch (error) {
    alert("Unable to find location - default to Dublin");
    return { lat: 53.34, lng: -6.26 };
  }
}

async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
    } else {
      reject(new Error("Geolocation is not supported by the browser."));
    }
  });
}
let intervalId;

function startTimer(id) {
  // Clear the previous timer, if any
  clearInterval(intervalId);

  // Set a new interval and store the ID
  intervalId = setInterval(() => {
    const time = getTimeDifference(id[0], id[1]);
    daysElement.innerHTML = `${time.days}`;
    hoursElement.innerHTML = `${time.hours}`;
    minutesElement.innerHTML = `${time.minutes}`;
    secondsElement.innerHTML = `${Math.trunc(time.seconds)}`;
  }, 1000); // Adjust the interval duration as needed
}

export async function displayGeolocationData(geoCodeData, timezoneData) {
  // ONLY WORKS WITH BACKEND
  const id = timezoneData.timeZoneId.split("/");

  startTimer(id);

  const countryCodeResult = geoCodeData?.results.find((result) =>
    result.address_components.some((component) =>
      component.types.includes("country")
    )
  );

  const countryCode = countryCodeResult?.address_components.find((component) =>
    component.types.includes("country")
  )?.short_name;

  const countryInfoResponse = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}`
  );
  const countryInfo = await countryInfoResponse.json();

  // TIMEZONE DISABLED DURING TESTING

  const { dstOffset, rawOffset } = timezoneData;

  const currentTime = Date.now();
  const totalOffsetMilliseconds = dstOffset
    ? dstOffset * 1000
    : rawOffset * 1000;
  const countryTime = new Date(currentTime + totalOffsetMilliseconds);

  const distance = newYearDate - countryTime;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const flagSrc = countryInfo[0]?.flags?.svg;

  flagElement.src = flagSrc;

  selectedCountryElement.innerText = countryInfo[0]?.name?.common;

  const filteredCountry = countryData.filter(
    (country) => country.country === countryInfo[0]?.name?.common
  );

  if (filteredCountry && filteredCountry.length > 0) {
    selectedCountryText.innerText = filteredCountry[0].activity;
  } else {
    selectedCountryText.innerText = `Know how people in ${countryInfo[0]?.name?.common} celebrate NYE? Please let us know so we can update our map and share it with the world! `;
  }

  // return data;
}

export async function fetchGeolocationTimezoneData(lat, lng) {
  console.log("FETCHING API - PLEASE USE CARFEULLY");
  const response = await fetch(
    "https://googlefetchapi-4209c876662c.herokuapp.com/api/timezone",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat, lng }),
    }
  );

  const { data } = await response.json();

  const { geoCodeData, timezoneData } = data;

  displayGeolocationData(geoCodeData, timezoneData);

  return { geoCodeData, timezoneData };
}

// getCurrentLocationLatLng();
