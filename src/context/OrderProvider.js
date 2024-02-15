"use client";
import React, { createContext, useState } from "react";

// Create the OrderContext
export const OrderContext = createContext();

// Create the OrderProvider component
export const OrderProvider = ({ children }) => {
  // Define the initial state of the order
  const initialState = {
    address: "",
    profile: "",
    details: "",
    price: 0,
    submitted: false,
  };

  // Create a state variable to hold the order state
  const [order, setOrder] = useState(initialState);

  // Define functions to update the order state
  const setAddress = (address) => {
    setOrder((prevOrder) => ({ ...prevOrder, address }));
  };

  const setProfile = (profile) => {
    setOrder((prevOrder) => ({ ...prevOrder, profile }));
  };

  const setDetails = (details) => {
    setOrder((prevOrder) => ({ ...prevOrder, details }));
  };

  const setPrice = (price) => {
    setOrder((prevOrder) => ({ ...prevOrder, price }));
  };

  const setSubmitted = (submitted) => {
    setOrder((prevOrder) => ({ ...prevOrder, submitted }));
  };

  // Create an object to hold the state and update functions
  const orderContextValue = {
    order,
    setAddress,
    setProfile,
    setDetails,
    setPrice,
    setSubmitted,
  };

  // Render the OrderProvider component with the orderContextValue
  return (
    <OrderContext.Provider value={orderContextValue}>
      {children}
    </OrderContext.Provider>
  );
};
