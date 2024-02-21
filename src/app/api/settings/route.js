import Order from "@/model/Order";
import Settings from "@/model/Settings";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connect();
      const settings = await Settings.find();
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

export const PUT = async (req) => {
  if (req.method === "PUT") {
    try {
      await connect();
      const maxAllowedOrders = req.json(); // Assuming maxAllowedOrders is sent in the request body
      const settings = await Settings.findOneAndUpdate(
        {},
        { maxAllowedOrders },
        { new: true }
      );
      return new NextResponse(
        JSON.stringify({
          status: 200,
          data: settings,
          message: "Settings updated successfully",
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
