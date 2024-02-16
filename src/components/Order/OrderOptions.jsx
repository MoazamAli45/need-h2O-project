import React from "react";
import CustomDateTime from "./CustomDateTime";
import CustomSelectBox from "./CustomSelectBox";

const OrderOptions = () => {
  return (
    <div className="md:w-[60%] mx-auto py-8 flex flex-col space-y-12">
      <CustomDateTime />
      <CustomSelectBox />
    </div>
  );
};

export default OrderOptions;
