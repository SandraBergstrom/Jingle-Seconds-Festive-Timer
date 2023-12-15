const { DateTime } = require("luxon");

/**
 * Returns a local time based on local time based on list of time-zones.
 * Example format for location "Pacific".
 * Example format for town "Honolulu".
 */
function getSpecificLocalTime(location, town) {
  let specificLocalTime = DateTime.now({ zone: `${location}/${town}` });
  return specificLocalTime;
}

/**
 * Pass a date as a string in a format YY-MM-DD
 * and location/town based on list of time-zones.
 * Example format for date "2020-01-12"
 * Example format for location: "Pacific"
 * Example format for town: "Honolulu".
 * Returns an object
 **/
function getHolidayTimeISO(date, location, town) {
  return DateTime.fromISO(`${date}`, { zone: `${location}/${town}` });
}

/**
 * Returns a difference between location in specific time-zone from a holiday as an object
 * in a form {days: days-value, hours: hours-value, minutes: minutes-value, seconds: seconds-value}.
 * Example format for location "Pacific".
 * Example format for town "Honolulu".
 */
function getTimeDifference(location, town) {
  let actualTime = getSpecificLocalTime(location, town);
  let holidayTime = getHolidayTimeISO("2024-01-01", location, town);

  return holidayTime
    .diff(actualTime, ["days", "hours", "minutes", "seconds"])
    .toObject();
}

export default getTimeDifference;
