import Coupon from "@/model/Coupon";
import WaterPrice from "@/model/WaterPrice";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  if (req.method === "GET") {
    try {
      await connect();
      const { query } = params;
      console.log(query);
      const waterPrice = await WaterPrice.findById(query);
      return new NextResponse(
        JSON.stringify({
          status: 200,
          data: waterPrice,
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
