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
import { Switch } from "../ui/switch";
import AlertModal from "../shared/AlertModal";
import { Button } from "../ui/button";

const maxAllowed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function UpdateMaximumOrders() {
  const [maxAllowedOrders, setMaxAllowedOrders] = React.useState(0);
  const [selectedValue, setSelectedValue] = React.useState("");

  //  Now for town water and pure water will be stored state in local storage
  const [activateTownWater, setActivateTownWater] = React.useState(true);
  const [activatePureWater, setActivatePureWater] = React.useState(true);

  //  FOR MODAL TO CHANGE THE PRICE
  const [showModal, setShowModal] = React.useState(false);

  //   AREAS
  const [areas, setAreas] = React.useState([]);
  const [selectedArea, setSelectedArea] = React.useState("");
  const [townWaterPrice, setTownWaterPrice] = React.useState(
    selectedArea?.townWaterPrice || 0
  );
  const [pureWaterPrice, setPureWaterPrice] = React.useState(
    selectedArea?.pureWaterPrice || 0
  );

  React.useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get("/api/water-area");
        setAreas(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      }
    };

    const getWaterStates = async () => {
      try {
        const response = await axios.get("/api/activate-water");

        setActivateTownWater(response?.data?.data[0]?.townWater);
        setActivatePureWater(response?.data?.data[0]?.pureWater);
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      }
    };

    fetchAreas();
    getWaterStates();
  }, []);

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

  console.log(townWaterPrice, pureWaterPrice);

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

  const handleActivateTownWater = async () => {
    try {
      const response = await axios.put("/api/activate-water", {
        townWater: !activateTownWater,
        pureWater: activatePureWater,
      });
      setActivateTownWater(response.data.data.townWater);
      if (response.status === 200) {
        // Optionally, you can notify the user about the successful update
        toast.success("Town Water activated successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      // Notify the user about any error that occurred during the update process
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };
  const handleActivatePureWater = async () => {
    try {
      const response = await axios.put("/api/activate-water", {
        townWater: activateTownWater,
        pureWater: !activatePureWater,
      });

      setActivatePureWater(response.data.data.pureWater);
      if (response.status === 200) {
        // Optionally, you can notify the user about the successful update
        toast.success("Town Water activated successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      // Notify the user about any error that occurred during the update process
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  console.log(activateTownWater, activatePureWater, "Pure");

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const openModalHandler = () => {
    setShowModal(true);
  };

  const handleChangeArea = (newValue) => {
    setSelectedArea(newValue);
    setTownWaterPrice(newValue?.townWaterPrice);
    setPureWaterPrice(newValue?.pureWaterPrice);
  };

  const updatePriceHandler = async (area, townWaterPrice, pureWaterPrice) => {
    try {
      const response = await axios.put(`/api/water-area`, {
        city: area,
        townWaterPrice,
        pureWaterPrice,
      });

      console.log(response);
      if (response.status === 200) {
        // Optionally, you can notify the user about the successful update
        toast.success("Price updated successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      // Notify the user about any error that occurred during the update process
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
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

      {/*   RADIO FOR SHOWING PURE WATER AND TOWN WATER */}
      <div className="flex flex-row gap-4 items-center flex-wrap">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-1">
            <Label className="text-[14px] sm:text-[16px] gap-2 ">
              Town Water:
            </Label>
            <Switch
              checked={activateTownWater}
              onCheckedChange={handleActivateTownWater}
              className="bg-[#007BFF]"
            />
          </div>
          <div className="flex flex-row gap-1">
            <Label className="text-[14px] sm:text-[16px] gap-2 ">
              Pure Water:
            </Label>
            <Switch
              checked={activatePureWater}
              onCheckedChange={handleActivatePureWater}
              className="bg-[#007BFF]"
            />
          </div>
        </div>
        <Button onClick={openModalHandler}>Change Price By Area</Button>
      </div>

      {/*  ALERT MODAL */}
      <AlertModal isOpen={showModal} onClose={closeModalHandler}>
        <div className="flex flex-col gap-4">
          <h2 className="text-[18px] font-bold text-center">Update Price</h2>
          <div className="flex flex-row gap-2 items-center">
            <Label className="text-[14px] sm:text-[16px] gap-2 ">Area:</Label>
            <Select value={selectedArea} onValueChange={handleChangeArea}>
              <SelectTrigger className="w-full ">
                <SelectValue
                  placeholder="Update Area Price"
                  value={selectedArea}
                />
              </SelectTrigger>
              <SelectContent className="z-[1000]">
                <SelectGroup>
                  <SelectLabel>---Please Select---</SelectLabel>
                  {areas.map((area, id) => (
                    <SelectItem value={area} key={area?._id}>
                      {area?.city}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Label className="text-[14px] sm:text-[16px] gap-2 ">
              Town Water:
            </Label>
            <input
              type="number"
              placeholder="Enter Price"
              className="border border-gray-300 rounded-md p-2"
              min={0}
              value={townWaterPrice}
              onChange={(e) => setTownWaterPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Label className="text-[14px] sm:text-[16px] gap-2 ">
              Pure Water:
            </Label>
            <input
              type="number"
              placeholder="Enter Price"
              className="border border-gray-300 rounded-md p-2"
              min={0}
              value={pureWaterPrice}
              onChange={(e) => setPureWaterPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-2 mt-1">
            <Button
              onClick={closeModalHandler}
              variant="outline"
              className="grow"
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                updatePriceHandler(
                  selectedArea?.city,
                  townWaterPrice,
                  pureWaterPrice
                )
              }
              className="grow"
            >
              Update
            </Button>
          </div>
        </div>
      </AlertModal>
    </div>
  );
}

export default UpdateMaximumOrders;
