import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import Order from "@/model/Order";
import connect from "@/utils/db";
export const POST = async (req) => {
  try {
    console.log("checkout");
    await connect();

    const body = await req.json();
    console.log(body, "Body");
    const order = await Order.findById(body);
    console.log(order, "Order");
    order.submitted = true;

    await order.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/`,
      customer_email: order.profile.email,
      //   client_reference_id: req.params.orderId,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: order.price * 100,
            product_data: {
              name: "Blake's Quality Water",
            },
          },
          quantity: 1,
        },
      ],
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        url: session.url,
        session,
      })
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        status: 400,
        error: err.message,
      })
    );
  }
};
