import Coupon from "@/model/Coupon";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  if (req.method === "GET") {
    try {
      await connect();
      const { query: code } = params;
      const coupons = await Coupon.find({ code });
      return new NextResponse(
        JSON.stringify({
          status: 200,
          data: coupons,
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
