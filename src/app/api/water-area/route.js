import connect from "@/utils/db";
import { NextResponse } from "next/server";
import WaterPrice from "@/model/WaterPrice";
export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connect();
      const WaterPricesArea = await WaterPrice.find();
      return new NextResponse(
        JSON.stringify({
          status: 200,
          data: WaterPricesArea,
          message: "Data Successfully Fetched!!",
        })
      );
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({
          status: 500,
          message: error,
        })
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({
        status: 500,
        message: "NOT ALLOWED",
      })
    );
  }
};

export const PUT = async (req) => {
  if (req.method === "PUT") {
    try {
      await connect();
      const { city, townWaterPrice, pureWaterPrice } = await req.json(); // Assuming maxAllowedLoads is sent in the request body
      const updatedWaterPrice = await WaterPrice.findOneAndUpdate(
        { city },
        { townWaterPrice, pureWaterPrice },
        { new: true }
      );
      return new NextResponse(
        JSON.stringify({
          status: 200,
          data: updatedWaterPrice,
          message: "Water Price updated successfully",
        })
      );
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({
          status: 500,
          message: error,
        })
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({
        status: 500,
        message: "NOT ALLOWED",
      })
    );
  }
};
