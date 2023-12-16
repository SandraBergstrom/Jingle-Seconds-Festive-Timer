import mapboxgl from "mapbox-gl";
import {
  getCurrentLocationLatLng,
  fetchGeolocationTimezoneData,
  displayGeolocationData,
} from "./countdown";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFybmVzbG93IiwiYSI6ImNsMGUyeHV6MDBmMGYzanBybDIyZ3BvOTQifQ.orwWz3XDibvdJSe_tfAxEA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-v9",
  projection: "globe", // Display the map as a globe, since satellite-v9 defaults to Mercator
  zoom: 1,
  center: [-90, 40],
});

map.on("style.load", () => {
  map.setFog({}); // Set the default atmosphere style
});

// The following values can be changed to control rotation speed:

// At low zooms, complete a revolution every two minutes.
const secondsPerRevolution = 120;
// Above zoom level 5, do not rotate.
const maxSpinZoom = 5;
// Rotate at intermediate speeds between zoom levels 3 and 5.
const slowSpinZoom = 3;

let userInteracting = false;
let spinEnabled = true;

function spinGlobe() {
  const zoom = map.getZoom();
  if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
    let distancePerSecond = 360 / secondsPerRevolution;
    if (zoom > slowSpinZoom) {
      // Slow spinning at higher zooms
      const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
      distancePerSecond *= zoomDif;
    }
    const center = map.getCenter();
    center.lng -= distancePerSecond;
    // Smoothly animate the map over one second.
    // When this animation is complete, it calls a 'moveend' event.
    map.easeTo({ center, duration: 1000, easing: (n) => n });
  }
}

// Pause spinning on interaction
map.on("mousedown", () => {
  userInteracting = true;
});

// Restart spinning the globe when interaction is complete
map.on("mouseup", () => {
  userInteracting = false;
  spinGlobe();
});

// These events account for cases where the mouse has moved
// off the map, so 'mouseup' will not be fired.
map.on("dragend", () => {
  userInteracting = false;
  spinGlobe();
});
map.on("pitchend", () => {
  userInteracting = false;
  spinGlobe();
});
map.on("rotateend", () => {
  userInteracting = false;
  spinGlobe();
});

map.on("moveend", () => {
  spinGlobe();
});

map.on("click", (e) => {
  const { lng, lat } = e.lngLat;

  // FUNCTION RUNS WITH BACKEND SERVER
  fetchGeolocationTimezoneData(lat, lng);
  // displayGeolocationData();

  map.flyTo({
    center: [lng, lat],
    zoom: 4,
    essential: true,
  });
});

// document.getElementById("btn-spin").addEventListener("click", (e) => {
//   spinEnabled = !spinEnabled;
//   if (spinEnabled) {
//     spinGlobe();
//     e.target.innerHTML = "Pause rotation";
//   } else {
//     map.stop(); // Immediately end ongoing animation
//     e.target.innerHTML = "Start rotation";
//   }
// });

// Removed the e.target.innerHTML to prevent the button from changing text
// when clicked. In html there is now icons instead and a seperate function
// to toggle the icons. 
document.getElementById("btn-spin").addEventListener("click", () => {
  spinEnabled = !spinEnabled;
  if (spinEnabled) {
    spinGlobe();
  } else {
    map.stop(); // Immediately end ongoing animation
  }
});

spinGlobe();

// Zooms to user position
async function zoomToLatLng() {
  const { lat, lng } = await getCurrentLocationLatLng();
  map.flyTo({
    center: [lng, lat],
    zoom: 4,
    essential: true,
  });
}
zoomToLatLng();
