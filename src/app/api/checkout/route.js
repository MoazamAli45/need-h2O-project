import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY, "SECRET KEY");
import Order from "@/model/Order";
export const POST = async (req, res) => {
  try {
    const body = await req.json();
    const order = await Order.findById(body._id);
    order.submitted = true;

    await order.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `/checkout-success`,
      cancel_url: `/`,
      //   customer_email: req.user.email,
      //   client_reference_id: req.params.orderId,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: order.price,
            product_data: {
              name: "Blake's Quality Water",
            },
          },
          quantity: 1,
        },
      ],
    });

    return new NextResponse({
      success: true,
      url: session.url,
      session,
    });
  } catch (err) {
    return new NextResponse({
      status: 400,
      error: err.message,
    });
  }
};
