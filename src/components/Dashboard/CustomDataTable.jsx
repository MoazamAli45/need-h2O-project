"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getData } from "@/lib/getData";
import moment from "moment/moment";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import axios from "axios";

function CustomDataTable(props) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const orders = await getData();
      setData(orders);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    //   I want to delete the order with the id from the database
    try {
      const response = await axios.delete(`/api/order/${id}`);

      console.log(response, "Response from delete request");
      if (response.status === 200) {
        // After successful deletion, fetch data again
        await fetchData();
        //   Refresh the parent component
        props.onRefresh();
        toast.success("Order Deleted  successfully!!", {
          duration: 2000,
        });
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      console.log(error);
      // Handle error
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  if (loading) {
    return (
      <div class="animate-pulse">
        <div class="h-8 bg-gray-300 mt-3 mb-6 rounded"></div>
        <div class="h-8 bg-gray-300 mb-6 rounded"></div>
        <div class="h-8 bg-gray-300 mb-6 rounded"></div>
        <div class="h-8 bg-gray-300 mb-6 rounded"></div>
        <div class="h-8 bg-gray-300 mb-6 rounded"></div>
        <div class="h-8 bg-gray-300 mb-6 rounded"></div>
      </div>
    );
  }

  return (
    <Table className="mb-4">
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email Address</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Tank Location</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>No of Loads</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{moment(item.date).format("MMMM Do YYYY")}</TableCell>
            <TableCell>
              {item?.profile.firstName + " " + item?.profile.lastName}
            </TableCell>
            <TableCell>{item?.profile.email}</TableCell>
            <TableCell>{item?.address}</TableCell>
            <TableCell>{item?.profile.tankLocation}</TableCell>
            <TableCell>{item?.profile.phoneNumber}</TableCell>
            <TableCell>
              {item?.details.pureWaterPrice === item.price
                ? "Pure Water"
                : "Town Water"}
            </TableCell>
            <TableCell>{item?.noOfLoads}</TableCell>
            <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
            <TableCell>
              <Button
                variant="destructive"
                onClick={() => deleteHandler(item._id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={9}>Total</TableCell>
          <TableCell>
            ${data?.reduce((acc, curr) => acc + curr.totalPrice, 0)}.00
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default CustomDataTable;
