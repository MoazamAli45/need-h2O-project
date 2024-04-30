import Order from "@/model/Order";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  console.log(params);
  const { orderId } = params;

  try {
    await connect();
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Order not found" })
      );
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    console.log("Deleted Order...", deletedOrder);

    return new NextResponse(
      JSON.stringify({ success: true, data: deletedOrder })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message })
    );
  }
};
