"use client";
import CheckoutStepper from "@/components/Order/CheckoutStepper";
import Navigation from "@/components/shared/Navigation";
import OrderContext from "@/context/OrderProvider";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { MdLocationPin } from "react-icons/md";
import { MdWaterDrop } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaDollarSign } from "react-icons/fa";
import OrderOptions from "@/components/Order/OrderOptions";
const CHECKOUT_STEPS = [
  {
    name: "My Location",
    Component: () => <></>,
    icon: <MdLocationPin color="white" />,
  },
  {
    name: "Order Options",
    Component: () => <OrderOptions />,
    icon: <MdWaterDrop color="white" />,
  },
  {
    name: "Delivery Details",
    Component: () => <div>Complete payment for your order.</div>,
    icon: <CgProfile color="white" />,
  },
  {
    name: "Payment",
    Component: () => <div> Your order has been delivered.</div>,
    icon: <FaDollarSign color="white" />,
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
