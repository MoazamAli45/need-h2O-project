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
    date: new Date(),
    price: 0,
    totalPrice: 0,
    noOfLoads: 0,
    maxLoadAllowed: 0,
    confirmOrdersLoad: 0,
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

  const setDate = (date) => {
    setOrder((prevOrder) => ({ ...prevOrder, date }));
  };
  const setTotalPrice = (totalPrice) => {
    setOrder((prevOrder) => ({ ...prevOrder, totalPrice }));
  };
  const setLoad = (noOfLoads) => {
    setOrder((prevOrder) => ({ ...prevOrder, noOfLoads }));
  };

  const setMaxLoad = (maxLoadAllowed) => {
    setOrder((prevOrder) => ({ ...prevOrder, maxLoadAllowed }));
  };

  const setConfirmOrdersLoad = (confirmOrdersLoad) => {
    setOrder((prevOrder) => ({ ...prevOrder, confirmOrdersLoad }));
  };

  // Create an object to hold the state and update functions
  const orderContextValue = {
    order,
    setAddress,
    setProfile,
    setDetails,
    setPrice,
    setSubmitted,
    setDate,
    setTotalPrice,
    setLoad,
    setMaxLoad,
    setConfirmOrdersLoad,
  };

  // Render the OrderProvider component with the orderContextValue
  return (
    <OrderContext.Provider value={orderContextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
