export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const options = {
    timeZone: "UTC", // Set the time zone to UTC or the appropriate time zone
    // other options as needed
  };

  return date.toLocaleString("en-NZ", options);
}
