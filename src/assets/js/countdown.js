const newYearDate = new Date("Jan 1, 2024 00:00:00").getTime();

const localCountryTimeElement = document.getElementById("localCountryTime");
const flagElement = document.getElementById("flag");
const selectedCountryElement = document.getElementById("selectedCountry");

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
export async function getCurrentLocationLatLng(lat, lng) {
  try {
    // const position = await getCurrentLocation();
    // const lat = position.coords.latitude;
    // const lng = position.coords.longitude;

    const { data } = await fetchAPI(lat, lng);

    const { geoCodeData, timezoneData } = data;

    console.log("geodata", geoCodeData);
    console.log("timezone", timezoneData);

    const countryCodeResult = geoCodeData.results.find((result) =>
      result.address_components.some((component) =>
        component.types.includes("country")
      )
    );

    const countryCode = countryCodeResult?.address_components.find(
      (component) => component.types.includes("country")
    )?.short_name;

    const countryResult = geoCodeData.results.find((result) =>
      result.address_components.some((component) =>
        component.types.includes("country")
      )
    );

    const country = countryResult?.address_components.find((component) =>
      component.types.includes("country")
    )?.long_name;

    console.log("Country:", country);

    console.log("Code", countryCode);

    const countryInfoResponse = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    const countryInfo = await countryInfoResponse.json();

    const { dstOffset, rawOffset } = timezoneData;

    const currentTime = Date.now();
    const totalOffsetMilliseconds = dstOffset
      ? dstOffset * 1000
      : rawOffset * 1000;
    const countryTime = new Date(currentTime + totalOffsetMilliseconds);

    localCountryTimeElement.innerHTML;

    const distance = newYearDate - countryTime;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    localCountryTimeElement.innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    console.log(countryInfo[0]);

    const flagSrc = countryInfo[0]?.flags?.svg;

    flagElement.src = flagSrc;

    selectedCountryElement.innerText = countryInfo[0]?.name?.common;

    // const { dstOffset } = data;

    // setUpTimer(dstOffset);

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

async function fetchAPI(lat, lng) {
  const response = await fetch("http://localhost:3000/api/timezone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lat, lng }),
  });

  const data = await response.json();

  return data;
}

// getCurrentLocationLatLng();
