"use client";
import React, { useState } from "react";
import Wrapper from "../shared/Wrapper";
import Image from "next/image";
import Link from "next/link";
import { MdMenu } from "react-icons/md";

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleHandler = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  return (
    <nav>
      <Wrapper styles="px-4 sm:px-8 md:px-14">
        <div className="flex justify-between items-center py-4 ">
          <Image src={"/home/logo.svg"} alt="logo" width={150} height={70} />
          <div className="hidden sm:flex gap-6 sm:pr-8 ">
            <Link href="/" className="text-[16px] font-medium">
              Home
            </Link>
            <Link href="/about" className="text-[16px] font-medium">
              About Us
            </Link>
            <Link href={"/services"} className="text-[16px] font-medium">
              Water Services
            </Link>
          </div>
          <div className="sm:hidden">
            <MdMenu size={30} onClick={toggleHandler} />
          </div>
        </div>
      </Wrapper>
      <div
        className={`${
          !isDrawerOpen
            ? ""
            : "fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-50 z-50"
        } `}
        onClick={toggleHandler}
      >
        <div
          className={` fixed top-0 left-0 h-full w-64 bg-white shadow z-50
        transition-transform ${
          isDrawerOpen
            ? "transform translate-x-0"
            : "transform -translate-x-full"
        }`}
        >
          <ul className="relative flex flex-col py-8 ">
            <li>
              <Link href="/" className="block py-2 px-4 text-[14px] ">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="block py-2 px-4 text-[14px]">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="block py-2 px-4 text-[14px]">
                Water Services
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
