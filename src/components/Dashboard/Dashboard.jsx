"use client";
import React, { useEffect } from "react";
import CustomDataTable from "./CustomDataTable";
import { getData } from "@/lib/getData";
import { toast } from "sonner";
import UpdateMaximumOrders from "./UpdateMaximumOrders";
import AddCoupon from "./AddCoupon";

const Dashboard = () => {
  const [data, setData] = React.useState([]);
  const fetchdata = async () => {
    try {
      const orders = await getData();
      setData(orders);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const totalEarned = data?.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalOrders = data?.length;

  return (
    <>
      <div className="flex items-center max-w-7xl md:px-6 mx-auto justify-center w-full ">
        <div className="flex-col items-center justify-center text-gray-800 text-center w-full">
          <div className="flex w-full">
            <div className="flex md:flex-row flex-col p-4 space-x-4 space-y-2 max-w-8xl justify-around  w-full h-auto lg:h-50 i8ms-center ">
              <div className=" w-[90%] md:w-1/2 bg-gray-200 py-8 rounded-2xl flex items-center justify-center ml-4 flex-1">
                <div className="flex-col  items-center px-0 md:px-6">
                  <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400  bg-clip-text text-transparent">
                    ${totalEarned.toFixed(2)}
                  </div>
                  <div className="text-md mt-6 font-bold text-gray-800">
                    Total Revenue
                  </div>
                  <div className="text-xs font-medium text-gray-800">
                    Earned by Blakes&apos;s Quality Water
                  </div>
                </div>
              </div>
              <div className=" w-[90%] md:w-1/2 bg-gray-200 py-8 rounded-2xl flex items-center justify-center ml-4 flex-1">
                <div className="flex-col  items-center px-0 md:px-6">
                  <div className="text-3xl sm:text-5xl  font-bold bg-gradient-to-l from-fuchsia-500 to-orange-500  bg-clip-text text-transparent">
                    {totalOrders}
                  </div>
                  <div className="text-md mt-6 font-bold text-gray-800">
                    Total Number of Orders
                  </div>
                  <div className="text-xs font-medium text-gray-800">
                    By Blake&apos;s Quality Water
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 custom-lg:flex-row  justify-between my-4 max-w-7xl px-6 mx-auto  w-full ">
        <AddCoupon />
        <UpdateMaximumOrders />
      </div>
      <div className="max-w-7xl md:px-6 mx-auto ">
        <CustomDataTable />
      </div>
    </>
  );
};

export default Dashboard;
