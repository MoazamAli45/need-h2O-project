import Coupon from "@/model/Coupon";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connect();
      const { code } = req.json();
      const settings = await Coupon.find({ code });
      return new NextResponse(
        JSON.stringify({
          status: 200,
          data: settings,
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

export const POST = async (req) => {
  if (req.method === "POST") {
    try {
      await connect();
      const { code, discount, expiry } = await req.json(); // Assuming code, discount and expiry are sent in the request body
      console.log(code, discount, expiry, "coupon 😊");
      const coupon = new Coupon({
        code,
        discount,
        expiry,
      });
      const newCoupon = await coupon.save();
      return new NextResponse(
        JSON.stringify({
          status: 200,
          data: newCoupon,
          message: "Coupon added successfully",
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
