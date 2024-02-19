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
import { formatDateTime } from "@/lib/formatDateTime";
import { getData } from "@/lib/getData";
import React, { useEffect } from "react";
import { toast } from "sonner";

function CustomDataTable() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const fetchdata = async () => {
    try {
      const orders = await getData();
      setData(orders);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      fetchdata();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  console.log(loading, "Loading");
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
          <TableHead> Address</TableHead>
          <TableHead>Confirm Address</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{formatDateTime(item.date)}</TableCell>
            <TableCell>
              {item?.profile.firstName + item?.profile.lastName}
            </TableCell>
            <TableCell>{item?.profile.email}</TableCell>
            <TableCell>{item?.address}</TableCell>
            <TableCell>{item?.profile.confirmAddress}</TableCell>
            <TableCell>{item?.profile.phoneNumber}</TableCell>
            <TableCell>
              {item?.details.pureWaterPrice === item.price
                ? "Pure Water"
                : "Town Water"}
            </TableCell>
            <TableCell>${item.price.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8}>Total</TableCell>
          <TableCell>
            ${data?.reduce((acc, curr) => acc + curr.price, 0)}.00
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default CustomDataTable;
