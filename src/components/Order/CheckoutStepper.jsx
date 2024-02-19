/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import Wrapper from "../shared/Wrapper";
import { Button } from "../ui/button";
import OrderContext from "@/context/OrderProvider";
import { toast } from "sonner";
import { getData } from "@/lib/getData";
import { set } from "mongoose";

const initialState = {
  address: "",
  profile: "",
  details: "",
  date: "",
  price: 0,
  submitted: false,
};

const CheckoutStepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(2);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  //   Loading State
  const [loading, setIsLoading] = useState(false);

  const [isValidTime, setIsValidTime] = useState(false);

  const stepRef = useRef([]);
  //    data from useContext
  const { order, setOrder } = useContext(OrderContext);
  const { profile } = order;

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  const validateTimeHandler = async () => {
    try {
      const data = await getData();

      // Assuming the order date is stored in the state
      const { date: orderDate } = order;

      // Convert orderDate to a JavaScript Date object
      const orderDateTime = new Date(orderDate);
      let isValid = false;
      // Check if orderDate is not equal to any date in the data array
      for (const item of data) {
        const dbDateTime = new Date(item.date);

        // Check if orderDate is not exactly equal to dbDateTime

        // and it's not one hour before dbDateTime
        if (
          !(
            orderDateTime.getTime() === dbDateTime.getTime() ||
            orderDateTime.getTime() ===
              dbDateTime.getTime() - 1 * 60 * 60 * 1000 ||
            orderDateTime.getTime() ===
              dbDateTime.getTime() + 1 * 60 * 60 * 1000
          )
        ) {
          console.log(orderDateTime, dbDateTime, "Time is valid");
          isValid = true;
        }
      }

      if (isValid) {
        console.log("Time is valid");
        // Time is valid
        setIsValidTime(true);
      } else {
        // Time is not valid
        setIsValidTime(false);
        // Notify the user about the invalid time if needed
        toast.error("Order time is invalid. Please choose a different time.");
      }
    } catch (error) {
      console.error("Error occurred while validating time:", error);
      // Handle error
      // You might want to notify the user or handle the error in some way
    }
  };

  const handleNext = () => {
    //  check for second step
    if (currentStep === 2) {
      validateTimeHandler();
    }

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

  //   CHECKOUT HANDLER
  const checkoutHandler = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await res.json();
      //
      setOrder(initialState);
      console.log(order, data, "Order Data");
      //   STRIPE CHECKOUT

      const stripeRes = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data?.data._id),
      });
      if (!stripeRes.ok) {
        throw new Error("Something went wrong!");
      }

      const stripeData = await stripeRes.json();
      console.log(stripeData, "Stripe Data");
      if (stripeData?.success) {
        window.location.href = stripeData.url;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
            disabled={order?.price === 0}
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
                profile?.confirmAddress.length < 3 ||
                profile?.firstName.length < 3 ||
                profile?.lastName.length < 3
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
