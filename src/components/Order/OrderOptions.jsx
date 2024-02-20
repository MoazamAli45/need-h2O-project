"use client";
import React from "react";
import CustomDate from "../shared/CustomDateTime";
import CustomCheckbox from "../shared/CustomCheckbox";
import LoadSelectBox from "./LoadSelectBox";
import WaterSelectBox from "../shared/WaterSelectBox";

const OrderOptions = () => {
  return (
    <div className="md:w-[60%] mx-auto py-8 flex flex-col  justify-center items-center  space-y-12 ">
      {" "}
      <CustomDate />
      <WaterSelectBox />
      <CustomCheckbox label={"HELP! We're totally out of water."} />
      <LoadSelectBox />
    </div>
  );
};

export default OrderOptions;
