"use client";
import CheckoutStepper from "@/components/Order/CheckoutStepper";
import OrderContext from "@/context/OrderProvider";
// import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { MdLocationPin } from "react-icons/md";
import { MdWaterDrop } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaDollarSign } from "react-icons/fa";
import OrderOptions from "@/components/Order/OrderOptions";
import DeliveryDetails from "@/components/Order/DeliveryDetails";
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
    Component: () => <DeliveryDetails />,
    icon: <CgProfile color="white" />,
  },
  {
    name: "Payment",
    Component: () => <div> Your order has been delivered.</div>,
    icon: <FaDollarSign color="white" />,
  },
];

const Page = () => {
  // const router = useRouter();
  const { order } = useContext(OrderContext);

  if (!order.address) {
    // router.push("/");
  }
  return (
    <>
      <CheckoutStepper stepsConfig={CHECKOUT_STEPS} />
    </>
  );
};

export default Page;
