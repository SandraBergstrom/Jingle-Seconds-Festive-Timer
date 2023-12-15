const { DateTime } = require("luxon");

/**
 * Returns local time based on list of time-zones as an object.
 * Example format for location "Pacific" or "ETC"
 * Example format for town "Honolulu" or "GMT+1"
 */
function getSpecificLocalTime(location, town) {
  let specificLocalTime = DateTime.local({ zone: `${location}/${town}` });
  return specificLocalTime;
}

/**
 * Pass a date as a string in a format YY-MM-DD
 * and location/town based on list of time-zones.
 * Example format for date "2020-01-12"
 * Example format for location: "Pacific" or "ETC"
 * Example format for town: "Honolulu" or GMT+1
 * Returns an object.
 **/
function getNewYearTimeISO(date, location, town) {
  return DateTime.fromISO(`${date}`, { zone: `${location}/${town}` });
}

/**
 * Returns a difference between location in specific time-zone from a new year as an object
 * in a form {days: days-value, hours: hours-value, minutes: minutes-value, seconds: seconds-value}.
 * Example format for location "Pacific" or "ETC".
 * Example format for town "Honolulu" or "GMT+1".
 */
function getTimeDifference(location, town) {
  let actualTime = getSpecificLocalTime(location, town);
  let newYearTime = getNewYearTimeISO(
    `${actualTime.year + 1}-01-01`,
    location,
    town
  );

  return newYearTime
    .diff(actualTime, ["days", "hours", "minutes", "seconds"])
    .toObject();
}

export default getTimeDifference;
