"use client";
import CheckoutStepper from "@/components/Order/CheckoutStepper";
import Navigation from "@/components/shared/Navigation";
import OrderContext from "@/context/OrderProvider";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Delivered",
    Component: () => <div> Your order has been delivered.</div>,
  },
];

const Page = () => {
  const router = useRouter();
  const { order } = useContext(OrderContext);

  console.log(order);

  if (!order.address) {
    // router.push("/");
  }
  return (
    <>
      <Navigation />

      <CheckoutStepper stepsConfig={CHECKOUT_STEPS} />
    </>
  );
};

export default Page;
