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

const waterData = [
  {
    value: 11000,
    title: "1xload - 11,000L",
    load: 1,
  },
  {
    value: 22000,
    title: "2xloads - 12,000L",
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
  const { order, setTotalPrice } = React.useContext(OrderContext);

  const [selectedValue, setSelectedValue] = React.useState("");
  const [showPrice, setShowPrice] = React.useState(false);

  const handleChange = (newValue) => {
    setSelectedValue(newValue);

    setShowPrice(true);
  };

  React.useEffect(() => {
    const totalPrice = selectedValue * order?.price;
    setTotalPrice(totalPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue, order?.price]);

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
          <div className="border-t w-full mt-4 pt-6 flex flex-col items-center justify-center ">
            <h3 className="text-[18px]">
              Order total: ${order?.totalPrice.toFixed(2)}
            </h3>
          </div>
        )}
      </div>
    </>
  );
}

export default LoadSelectBox;
