// "use client";

// import * as React from "react";

// import { Calendar } from "@/components/ui/calendar";
// import OrderContext from "@/context/OrderProvider";

// function CustomDate() {
//   const [dateValue, setDateValue] = React.useState(new Date());

//   const { setDate } = React.useContext(OrderContext);

//   React.useEffect(() => {
//     setDate(dateValue);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dateValue]);

//   return (
//     <Calendar
//       mode="single"
//       selected={dateValue}
//       onSelect={setDateValue}
//       className="rounded-md border"
//     />
//   );
// }

// export default CustomDate;

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import OrderContext from "@/context/OrderProvider";
import { isAfter } from "date-fns"; // Importing isAfter function from date-fns

function CustomDate() {
  const [dateValue, setDateValue] = React.useState(new Date());

  const { setDate } = React.useContext(OrderContext);

  React.useEffect(() => {
    setDate(dateValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateValue]);

  // Function to handle date selection
  const handleSelect = (date) => {
    // Check if selected date is not in the past
    if (!isAfter(date, new Date())) {
      setDateValue(date); // Update the selected date
    }
  };

  return (
    <Calendar
      mode="single"
      selected={dateValue}
      onSelect={handleSelect} // Pass the handleSelect function
      className="rounded-md border"
    />
  );
}

export default CustomDate;
