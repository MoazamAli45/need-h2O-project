export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  // Create a new Date object
  console.log(date, "date");
  // Get year, month, day, hours, and minutes
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert hours to 12-hour format
  const formattedHours = hours % 12;
  console.log(formattedHours, "formattedHours");
  // Determine AM or PM
  const period = hours < 12 ? "AM" : "PM";

  // Construct the final date string
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  // Construct the final time string
  const formattedTime = `${formattedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${period}`;

  // Concatenate date and time
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
}
