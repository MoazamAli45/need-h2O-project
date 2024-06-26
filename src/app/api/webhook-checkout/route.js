import Order from "@/model/Order";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req) => {
  const body = await req.text();

  const sign = req.headers.get("Stripe-Signature");
  if (!sign) {
    return new NextResponse(
      JSON.stringify({ status: 400, error: "No signature" })
    );
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sign,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: 400, error: "Invalid signature" })
    );
  }
  if (event.type === "checkout.session.completed") {
    await connect();

    const body = JSON.parse(event.data.object.metadata.order);
    console.log(body, "Body 🔥");

    if (!body)
      return new NextResponse(
        JSON.stringify({
          status: 400,
          message: "Invalid client reference Id",
        })
      );

    const order = new Order(body);

    // Save the order document to the database
    await order.save();

    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: "Order submitted",
      })
    );
  } else {
    return new NextResponse(
      JSON.stringify({
        status: 400,
        message: "Invalid event type",
      })
    );
  }
};
