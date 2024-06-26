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
import { toast } from "sonner";
import axios from "axios";

const maxAllowed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function UpdateMaximumOrders() {
  const [maxAllowedOrders, setMaxAllowedOrders] = React.useState(0);
  const [selectedValue, setSelectedValue] = React.useState("");

  const fetchSettings = async () => {
    try {
      const response = await axios.get("/api/settings");
      const maxAllowedLoads = response?.data?.data[0].maxAllowedLoads;
      setMaxAllowedOrders(maxAllowedLoads);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateSettings = async (maxAllowedLoads) => {
    try {
      const response = await axios.put("/api/settings", {
        maxAllowedLoads: maxAllowedLoads,
      });
      const updatedMaxAllowedLoads = response?.data?.data.maxAllowedLoads;

      setMaxAllowedOrders(updatedMaxAllowedLoads);
      // Optionally, you can notify the user about the successful update
      toast.success("Maximum allowed Loads updated successfully", {
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      // Notify the user about any error that occurred during the update process
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  const handleChange = (newValue) => {
    setSelectedValue(newValue);
    updateSettings(newValue);
  };

  React.useEffect(() => {
    fetchSettings();
  }, [selectedValue]);

  return (
    <div className="flex flex-col  sm:flex-row gap-2 items-center">
      <div className="flex flex-row gap-2 flex-1">
        <Label className="text-[12px] gap-2 ">Update MaxLoads:</Label>
        <Select value={selectedValue} onValueChange={handleChange}>
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Update Maximum  Orders per Day"
              value={selectedValue}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel> ---Please Select--- </SelectLabel>
              {maxAllowed.map((item, id) => (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <span className="font-semibold">
        Max Loads per Day:
        <span className="font-normal"> {maxAllowedOrders}</span>
      </span>
    </div>
  );
}

export default UpdateMaximumOrders;
