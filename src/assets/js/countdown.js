import getTimeDifference from "./countdownLocalized";
import countryData from "../../lib/data.json";

const flagElement = document.getElementById("flag");
const selectedCountryElement = document.getElementById("selectedCountry");
const selectedCountryText = document.getElementById("text-element");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

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

function startDefaultTimer() {
  clearInterval(intervalId);

  intervalId = setInterval(() => {
    const time = getTimeDifference("Europe", "London");

    countdown.innerText = `${time.days}d ${time.hours}h ${
      time.minutes
    }m ${Math.trunc(time.seconds)}s`;
  }, 1000); // Adjust the interval duration as needed
}

// STARTS THE DEFAULT TIMER
startTimer(["Europe", "London"]);

startDefaultTimer();

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
