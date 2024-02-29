"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import OrderContext from "@/context/OrderProvider";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import moment from "moment";

const waterData = [
  {
    value: 11000,
    title: "1xload - 11,000L",
    load: 1,
  },
  {
    value: 22000,
    title: "2xloads - 22,000L",
    load: 2,
  },
  {
    value: 33000,
    title: "3xloads- 33,000L",
    load: 3,
  },
  {
    value: 44000,
    title: "4xloads- 44,000L",
    load: 4,
  },
  {
    value: 55000,
    title: "5xloads- 55,000L",
    load: 5,
  },
];

function LoadSelectBox() {
  const { order, setTotalPrice, setLoad } = React.useContext(OrderContext);

  const [selectedValue, setSelectedValue] = React.useState("");
  const [showPrice, setShowPrice] = React.useState(false);
  const [coupon, setCoupon] = React.useState("");
  const [appliedCoupon, setAppliedCoupon] = React.useState(false);
  const [discount, setDiscount] = React.useState("");

  const handleChange = (newValue) => {
    setSelectedValue(newValue);

    setShowPrice(true);
  };
  console.log(order, "Order");

  React.useEffect(() => {
    const totalPrice = selectedValue * order?.price;
    setTotalPrice(totalPrice);
    setLoad(selectedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, order?.price]);

  const couponHandler = async () => {
    if (!coupon) {
      toast.error("Please enter a coupon code");
      return;
    }
    try {
      const data = await axios.get(`/api/v1/coupon/${coupon}`);
      const resData = data.data;
      if (resData.status !== 200) {
        throw new Error(resData.message);
      }

      if (resData.data.length === 0) {
        throw new Error("Invalid Coupon Code");
      }
      // Check if the coupon has already been applied by the user
      if (appliedCoupon) {
        toast.error("Coupon has already been applied");
        return;
      }

      const discountPer = resData.data[0].discount;
      setDiscount(discountPer);
      const expiry = resData.data[0].expiry;
      console.log(expiry);
      // Check if the expiry date is today or in the future compared to the current date
      if (moment(expiry).isSameOrAfter(moment(), "day")) {
        console.log(
          "Coupon is valid until",
          moment(expiry).format("MMMM Do YYYY")
        );
        const totalPrice =
          order.totalPrice - (order.totalPrice * discountPer) / 100;
        setTotalPrice(totalPrice);
        toast.success("Coupon applied successfully", {
          duration: 2000,
        });

        // Mark the coupon as applied for the current user
        setAppliedCoupon(true);
      } else {
        throw new Error("Coupon has expired");
      }
    } catch (err) {
      toast.error(err.message, {
        duration: 2000,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 w-[80%] mx-auto ">
        <Label> How much water would you like?</Label>
        <Select value={selectedValue} onValueChange={handleChange}>
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder=" ---Please Select---"
              value={selectedValue}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel> ---Please Select--- </SelectLabel>
              {waterData.map((item, id) => (
                <SelectItem value={item.load} key={item.load}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {showPrice && order.totalPrice !== 0 && (
          <div className="border-t w-full mt-4 pt-6 flex flex-col items-center justify-center space-y-6 ">
            <h3 className="text-[18px]">
              Order total: ${order?.totalPrice.toFixed(2)}
            </h3>
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="Enter Coupon Code"
                required
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button onClick={couponHandler}>Apply</Button>
            </div>
            <div className="flex justify-center">
              {discount && (
                <h3 className="text-[18px]">
                  Discount: {discount}% off your total
                </h3>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LoadSelectBox;
