import Order from "@/model/Order";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  if (req.method === "POST") {
    try {
      await connect();
      const body = await req.json();
       body.date = new Date(body.date).toUTCString();
      // Create a new order document
      const order = new Order(body);

      // Save the order document to the database
      await order.save();

      return new NextResponse(JSON.stringify({ success: true, data: order }));
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ success: false, error: error.message })
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ success: false, error: "NOT ALLOWED" })
    );
  }
};

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connect();
      const orders = await Order.find();
      return new NextResponse(
        JSON.stringify({
          status: 200,
          data: orders,
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
