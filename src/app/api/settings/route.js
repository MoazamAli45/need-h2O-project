import Loads from "@/model/Loads";
import Order from "@/model/Order";
import Settings from "@/model/Settings";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connect();
      const loads = await Loads.find();
      // console.log(loads, "GET Loads 😊");
      return new NextResponse(
        JSON.stringify({
          status: 200,
          data: loads,
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
      const { maxAllowedLoads } = await req.json(); // Assuming maxAllowedLoads is sent in the request body
      // console.log(maxAllowedLoads, "maxAllowedLoads 😊");
      const settings = await Loads.findOneAndUpdate(
        {},
        { maxAllowedLoads },
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
