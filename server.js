require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.post("/api/timezone", async (req, res) => {
  const { lat, lng } = req.body;

  const data = await fetchCurrentTimeZone(lat, lng);

  res.json({ message: "Fetch call received successfully!", data });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

async function fetchCurrentTimeZone(lat, lng) {
  console.log("Fetching " + lat + ", " + lng);

  const apiKey = process.env.GOOGLE_TIMEZONE_API_KEY;
  const timezoneURL = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=1331766000&key=${apiKey}`;

  const geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const [geoCodeResponse, timezoneResponse] = await Promise.all([
      fetch(geoCodeURL),
      fetch(timezoneURL),
    ]);

    if (!geoCodeResponse.ok || !timezoneResponse.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const geoCodeData = await geoCodeResponse.json();
    const timezoneData = await timezoneResponse.json();

    return { geoCodeData, timezoneData };
  } catch (error) {
    console.error("Error:", error);
  }
}
