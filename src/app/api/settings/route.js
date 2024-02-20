import Order from "@/model/Order";
import Settings from "@/model/Settings";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connect();
      const settings = await Settings.create();
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
