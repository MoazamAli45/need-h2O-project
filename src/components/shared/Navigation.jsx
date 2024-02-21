"use client";
import React, { useState } from "react";
import Wrapper from "../shared/Wrapper";
import Image from "next/image";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleHandler = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  console.log(pathname, "Pathname");
  return (
    <div>
      <Wrapper styles="px-0 sm:px-8 md:px-14">
        <div className="flex justify-between items-center py-4 ">
          <Image
            src={"/home/logo.jpg"}
            alt="logo"
            width={180}
            height={70}
            priority
          />
          <div className="hidden sm:flex gap-6 sm:pr-8 ">
            <Link
              href="/"
              className={`text-[16px]  ${
                pathname === "/" ? "font-bold text-bluePrimary" : "font-medium "
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-[16px]  ${
                pathname === "/about"
                  ? "font-bold text-bluePrimary"
                  : "font-medium "
              }`}
            >
              About Us
            </Link>
            <Link
              href={"/sources"}
              className={`text-[16px]  ${
                pathname === "/sources"
                  ? "font-bold text-bluePrimary "
                  : "font-medium "
              }`}
            >
              Water Sources
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
              <Link
                href="/"
                className={`block py-2 px-4 text-[14px] ${
                  pathname === "/"
                    ? "font-bold text-bluePrimary"
                    : "font-medium "
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 px-4 text-[14px] ${
                  pathname === "/about"
                    ? "font-bold text-bluePrimary"
                    : "font-medium "
                }`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/sources"
                className={`block py-2 px-4 text-[14px] ${
                  pathname === "/sources"
                    ? "font-bold text-bluePrimary"
                    : "font-medium "
                }`}
              >
                Water Sources
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
