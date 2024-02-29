"use client";

import * as React from "react";
import moment from "moment"; // Import moment.js library
import { toast } from "sonner"; // Import the toast function from the sonner library
import { Calendar } from "@/components/ui/calendar";
import OrderContext from "@/context/OrderProvider";
import axios from "axios";

function CustomDate() {
  const [dateValue, setDateValue] = React.useState();
  const { setDate } = React.useContext(OrderContext);

  //   Max Allowed Orders
  const [maxAllowedOrders, setMaxAllowedOrders] = React.useState(0);
  const [confirmedOrders, setConfirmedOrders] = React.useState([]);

  const fetchSettings = async () => {
    try {
      const response = await axios.get("/api/settings");
      const maxAllowedOrders = response?.data?.data[0].maxAllowedOrders;
      setMaxAllowedOrders(maxAllowedOrders);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/order");
      const orders = response?.data?.data;
      setConfirmedOrders(orders);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    fetchOrders();
    fetchSettings();
  }, []);

  const handleSelectDate = (selectedDate) => {
    const today = moment(); // Get today's date using moment.js
    const selected = moment(selectedDate);
    if (selected.isBefore(today, "day")) {
      // If selected date is before today, show error toast and don't update the state
      toast.error("Don't Select Past Date.", {
        duration: 2000,
      });
    } else {
      //     Now Checking if the order has not exceeded the maximum allowed orders
      try {
        // Get the selected order date
        const orderDate = moment(selectedDate).format("MMMM Do YYYY");
        // Filter confirmed orders for the selected date
        const ordersForDate = confirmedOrders.filter(
          (confirmedOrder) =>
            moment(confirmedOrder.date).format("MMMM Do YYYY") === orderDate
        );
        console.log(ordersForDate);
        // Check if the number of confirmed orders for the selected date exceeds the maximum allowed members
        if (ordersForDate.length >= maxAllowedOrders) {
          toast.error(
            "Maximum allowed members for this date has been exceeded.",
            {
              duration: 2000,
            }
          );
          return;
        }
      } catch (error) {
        toast.error(error.message, {
          duration: 2000,
        });
      }

      // If selected date is valid, update the state and context
      setDate(selectedDate);
      setDateValue(selectedDate);
    }
  };

  return (
    <Calendar
      mode="single"
      selected={dateValue}
      onSelect={handleSelectDate}
      className="rounded-md border-[1px] border-solid border-[#CCCCCC]"
    />
  );
}

export default CustomDate;
