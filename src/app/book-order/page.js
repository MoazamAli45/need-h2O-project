"use client";
import CheckoutStepper from "@/components/Order/CheckoutStepper";
import OrderContext from "@/context/OrderProvider";
import React, { useContext, useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { MdWaterDrop } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaDollarSign } from "react-icons/fa";
import OrderOptions from "@/components/Order/OrderOptions";
import DeliveryDetails from "@/components/Order/DeliveryDetails";
import { useRouter } from "next/navigation";
import Footer from "@/components/shared/Footer";
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
  const router = useRouter();
  const { order, setAddress, setDetails } = useContext(OrderContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      setIsLoading(true);
      const address = localStorage?.getItem("address");
      const details = JSON.parse(localStorage?.getItem("details"));
      setAddress(address);
      setDetails(details);
      setIsLoading(false);

      if (!address || !details) {
        router.push("/");
      }
    };

    fetchAddress();
  }, [order.address, router]);
  return (
    <>
      <div className="bg-bluePrimary-light pb-6">
        <CheckoutStepper stepsConfig={CHECKOUT_STEPS} />
      </div>
      <Footer />
    </>
  );
};

export default Page;
