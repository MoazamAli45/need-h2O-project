"use client";
/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import Wrapper from "../shared/Wrapper";
import { Button } from "../ui/button";
import OrderContext from "@/context/OrderProvider";
import { toast } from "sonner";
import axios from "axios";
import moment from "moment";

const CheckoutStepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  //   Loading State
  const [loading, setIsLoading] = useState(false);

  //   Max Allowed Orders
  const [maxAllowedOrders, setMaxAllowedOrders] = useState(0);
  const [confirmedOrders, setConfirmedOrders] = useState([]);

  const stepRef = useRef([]);
  //    data from useContext
  const { order } = useContext(OrderContext);
  const { profile } = order;

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

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });

    //  settings
    fetchSettings();
    fetchOrders();
  }, [stepRef, stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };
  const handleBack = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 2) {
        return prevStep;
      } else {
        return prevStep - 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  //   EMail Validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      //   RETURNING TRUE MEANS DISABLE THE BUTTON
      return true;
    }
  };

  console.log(order, "order");

  //   CHECKOUT HANDLER
  //  Step 3
  const checkoutHandler = async () => {
    try {
      setIsLoading(true);

      // Get the selected order date
      const orderDate = moment(order.date).format("MMMM Do YYYY");
      // Filter confirmed orders for the selected date
      const ordersForDate = confirmedOrders.filter(
        (confirmedOrder) =>
          moment(confirmedOrder.date).format("MMMM Do YYYY") === orderDate
      );

      console.log(ordersForDate, "ordersForDate");
      // Check if the number of confirmed orders for the selected date exceeds the maximum allowed members
      if (ordersForDate.length > maxAllowedOrders) {
        throw new Error(
          "Maximum allowed members for this date has been exceeded."
        );
      }
      //   STRIPE CHECKOUT

      const response = await axios.post("/api/checkout", order, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response, "response");

      if (!response.data.success) {
        throw new Error(response.data.error || "Something went wrong!");
      }
      const stripeData = response?.data;
      if (typeof window !== "undefined")
        if (stripeData?.success) {
          window.location.href = stripeData.url;
          console.log(stripeData.url);
        }
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  //   settings

  return (
    <Wrapper>
      <div className="stepper mt-8">
        {stepsConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className={`step ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              } ${currentStep === index + 1 ? "active" : ""} `}
            >
              <div className="step-number">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  step.icon
                )}
              </div>
              <div className="step-name">{step.name}</div>
            </div>
          );
        })}

        <div
          className="progress-bar "
          style={{
            width: `calc(100%-${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="progress "
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      <ActiveComponent />

      {!isComplete && (
        <div className=" flex justify-between md:pr-40 md:py-5">
          <Button
            className="btn"
            onClick={handleBack}
            disabled={currentStep === 2}
          >
            Back
          </Button>
          <Button
            className={`${currentStep === 3 ? "hidden" : ""}`}
            onClick={handleNext}
            disabled={
              order?.price === 0 || order?.totalPrice === 0 || !order?.date
            }
          >
            {currentStep === stepsConfig.length ? "Finish" : "Next"}
          </Button>

          {loading ? (
            <Button
              disabled
              className={`${currentStep === 3 ? "flex" : "hidden"}`}
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              className={`${currentStep === 3 ? "block" : "hidden"}  `}
              disabled={
                validateEmail(profile?.email) ||
                profile?.phoneNumber.length < 3 ||
                profile?.tankLocation.length < 3 ||
                profile?.firstName.length < 3 ||
                profile?.lastName.length < 3 ||
                profile?.distanceFromTank == "" ||
                profile?.driveaway.length === 0
              }
              onClick={checkoutHandler}
            >
              Pay Now
            </Button>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default CheckoutStepper;
