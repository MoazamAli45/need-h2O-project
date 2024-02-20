import React, { useContext, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import OrderContext from "@/context/OrderProvider";
import Link from "next/link";
import CustomTextArea from "../shared/CustomTextArea";
import CustomCheckbox from "../shared/CustomCheckbox";
import CustomSelectBox from "../shared/CustomSelectBox";

const driveAwayData = [
  "Low hanging trees",
  "Steep driveway",
  "Trucks can easily turn around",
  " Best if truck reverses down",
  "Tricky driveway (best to get our small truck)",
  "Shared driveway",
  "Gravel driveway",
  "Sharp turn on driveway",
  "Long driveway",
  "Short driveway",
];

const DeliveryDetails = () => {
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    tankLocation: "",
    driveaway: [],
    deliveryTime: "No thanks ,I prefer a daytime delivery",
    distanceFromTank: "10 meters",
    comments: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    tankLocation: "",
    deliveryTime: "",
    distanceFromTank: "",
    comments: "",
  });

  const { setProfile, order } = useContext(OrderContext);

  useEffect(() => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      tankLocation,
      comments,
      deliveryTime,
      distanceFromTank,
      driveaway,
    } = profileDetails;
    setProfile({
      firstName,
      lastName,
      email,
      phoneNumber,
      tankLocation,
      comments,
      deliveryTime,
      distanceFromTank,
      driveaway,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    profileDetails.firstName,
    profileDetails.lastName,
    profileDetails.email,
    profileDetails.phoneNumber,
    profileDetails.tankLocation,
    profileDetails.comments,
    profileDetails.deliveryTime,
    profileDetails.distanceFromTank,
    profileDetails.driveaway,
  ]);

  console.log(order, "Order");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const validateField = (fieldName, value) => {
    console.log("Comments", fieldName);
    if (value.length < 3) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: `${fieldName} should be at least 3 characters long.`,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    console.log(fieldName, "comments");
    if (fieldName === "email") {
      validateEmail(value);
    } else validateField(fieldName, value);

    setProfileDetails((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const toggleCheckbox = (index) => {
    setSelectedCheckboxes((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );

    const updatedDriveaway = selectedCheckboxes.includes(index)
      ? profileDetails.driveaway.filter((item) => item !== driveAwayData[index])
      : [...profileDetails.driveaway, driveAwayData[index]];
    setProfileDetails((prev) => ({
      ...prev,
      driveaway: updatedDriveaway,
    }));
  };

  console.log(profileDetails, "Profile Details");
  console.log(errors, "error");
  return (
    <form className="w-[95%] md:w-[80%] mx-auto py-8 flex flex-col space-y-6">
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="flex flex-col gap-4 w-full">
          <Label>First Name*</Label>
          <div className="h-[45px] flex flex-col gap-[5px]">
            <Input
              type="text"
              placeholder="First Name"
              required
              value={profileDetails.firstName}
              onChange={(e) => handleInputChange(e, "firstName")}
            />
            {errors.firstName && (
              <span className="text-red-500 text-[11px]">
                {errors.firstName}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Label>Last Name*</Label>
          <div className="h-[45px] flex flex-col gap-[5px]">
            <Input
              type="text"
              placeholder="Last Name"
              required
              value={profileDetails.lastName}
              onChange={(e) => handleInputChange(e, "lastName")}
            />
            {errors.lastName && (
              <span className="text-red-500 text-[11px]">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-4 sm:flex-row flex-col">
        <div className="flex flex-col gap-4 w-full">
          <Label>Email*</Label>
          <div className="h-[45px] flex flex-col gap-[5px]">
            <Input
              type="email"
              placeholder="Email Address"
              required
              value={profileDetails.email}
              onChange={(e) => handleInputChange(e, "email")}
            />
            {errors.email && (
              <span className="text-red-500  text-[12px]">{errors.email}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Label>Phone Number*</Label>
          <div className="h-[30px] flex flex-col gap-[5px]">
            <Input
              type="text"
              placeholder="Phone Number"
              required
              value={profileDetails.phoneNumber}
              onChange={(e) => handleInputChange(e, "phoneNumber")}
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-[11px]">
                {errors.phoneNumber}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col">
        <div className="flex flex-col gap-4 flex-1">
          <Label>Address for delivery*</Label>
          <div className="flex-col gap-2">
            <p>{order?.address}</p>
            <Link href="/" className="text-bluePrimary  text-[14px]">
              Change
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1 ">
          <Label>Describe your tank location*</Label>
          <div className="h-[45px] flex flex-col gap-[5px]">
            <CustomTextArea
              placeholder="Describe Tank Location"
              required
              value={profileDetails.tankLocation}
              onChange={(e) => handleInputChange(e, "tankLocation")}
            />
            {errors.tankLocation && (
              <span className="text-red-500 text-[11px]">
                {errors.tankLocation}
              </span>
            )}
          </div>
        </div>
      </div>
      {/*  Check Boxes and Below  */}
      <div className="flex sm:flex-row flex-col  pt-14">
        {/*  Checkboxes */}
        <div className="w-full">
          <Label>Tick all boxes that apply to your driveway*</Label>
          <div className="flex flex-col gap-2 mt-4">
            {driveAwayData.map((data, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`checkbox-${i}`}
                  checked={selectedCheckboxes.includes(i)}
                  onChange={() => toggleCheckbox(i)}
                />
                <label htmlFor={`checkbox-${i}`}>{data}</label>
              </div>
            ))}
          </div>
        </div>
        {/*  right side */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4 w-full">
            <Label className="leading-6">
              Are you happy to receive a night delivery between 8:30pm -
              11:30pm?
            </Label>
            <CustomSelectBox
              value1={"No thanks ,I prefer a daytime delivery"}
              value2={"Yes please - I need  water urgently"}
              placeholder={"Please select delivery time"}
              groupLabel={"--Please Select--"}
              onChange={(e) => handleInputChange(e, "deliveryTime")}
              value={profileDetails.deliveryTime}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Label className="leading-6">Distance from tank to truck*</Label>
            <CustomSelectBox
              value1={"10 meters"}
              value2={"20 meters"}
              value3={"40 meters"}
              value4={"60 meters"}
              value5={"80 meters"}
              value6={"100 meters"}
              value7={"I don't know"}
              placeholder={"--Please Select--"}
              groupLabel={"--Please Select--"}
              value={profileDetails.distanceFromTank}
              onChange={(e) => setProfileDetails(e, "distanceFromTank")}
            />
          </div>
          <div className="flex flex-col gap-4 flex-1 ">
            <Label>Message</Label>
            <div className="h-[45px] flex flex-col gap-[5px]">
              <CustomTextArea
                placeholder="Any Comments"
                required
                value={profileDetails.comments}
                onChange={(e) => handleInputChange(e, "comments")}
              />
              {/* {errors.comments && (
                <span className="text-red-500 text-[11px]">
                  {errors.comments}
                </span>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DeliveryDetails;
