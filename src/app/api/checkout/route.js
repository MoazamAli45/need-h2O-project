import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {
  try {
    const order = await req.json();

    console.log(order, "Order Coming in checkout route");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/`,
      customer_email: order.profile.email,
      mode: "payment",
      metadata: {
        order: JSON.stringify(order),
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: order.totalPrice * 100,
            product_data: {
              name: "Blake's Quality Water",
              images: [
                `https://needh2o.co.nz/wp-content/uploads/2021/01/Blakes-Water-Web-Logo.png`,
              ],
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
