"use client";
import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import CustomDatePicker from "../shared/CustomDatePicker";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";

const AddCoupon = () => {
  const [date, setDate] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");

  const dateHandler = (selectedDate) => {
    setDate(selectedDate.toString());
  };

  const submitHandler = async () => {
    if (!date || !coupon || !discount) {
      toast.error("Please fill all fields", {
        duration: 2000,
      });
      return;
    }

    try {
      const resCheck = await axios.get(`/api/v1/coupon/${coupon}`);
      const resCheckData = resCheck.data;
      if (resCheckData.status !== 200) {
        throw new Error(resCheckData.message);
      }

      if (resCheckData.data.length !== 0) {
        throw new Error("Coupon already exists");
      }

      const data = {
        code: coupon,
        discount,
        expiry: date,
      };
      const res = await axios.post("/api/v1/coupon", data);
      const resData = res.data;
      if (resData.status !== 200) {
        throw new Error(resData.message);
      }
      toast.success(resData.message, {
        duration: 2000,
      });
      setCoupon("");
      setDiscount("");
    } catch (err) {
      toast.error(err.message, {
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter Coupon Code"
          required
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <CustomDatePicker onSelectDate={dateHandler} />
      </div>
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Enter Discount"
          required
          max="100"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <Button onClick={submitHandler}>Add Coupon</Button>
      </div>
    </div>
  );
};

export default AddCoupon;
