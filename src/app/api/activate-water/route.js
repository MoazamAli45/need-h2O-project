import Loads from "@/model/Loads";
import WaterType from "@/model/WaterType";

import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  if (req.method === "GET") {
    try {
      await connect();
      const water = await WaterType.find();
      // console.log(loads, "GET Loads 😊");
      return new NextResponse(
        JSON.stringify({
          status: 200,
          data: water,
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

      const { townWater, pureWater } = await req.json();
      const updateData = {};

      if (townWater !== undefined) {
        updateData.townWater = townWater;
      }
      if (pureWater !== undefined) {
        updateData.pureWater = pureWater;
      }

      if (Object.keys(updateData).length === 0) {
        return new NextResponse(
          JSON.stringify({
            status: 400,
            message: "No fields to update",
          })
        );
      }

      const updatedWaterType = await WaterType.findOneAndUpdate(
        {},
        updateData,
        { new: true }
      );

      return new NextResponse(
        JSON.stringify({
          status: 200,
          data: updatedWaterType,
          message: "Water type updated successfully",
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
