import React from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { RxInstagramLogo } from "react-icons/rx";

const Footer = () => (
  <footer className="mb-2 md:mb-6">
    <Wrapper>
      <div className="flex justify-around">
        <Link
          href="/"
          className="font-normal text-[14px] sm:text-[16px] text-cyan"
        >
          Privacy Policy
        </Link>
        <Link
          href="/"
          className="font-normal text-[14px] sm:text-[16px] text-cyan"
        >
          Terms of Service
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-2 items-center justify-center">
        <div className="flex space-x-4">
          <CiFacebook className="text-[20px] text-cyan" />
          <CiTwitter className="text-[20px] text-cyan" />
          <RxInstagramLogo className="text-[20px] text-cyan" />
        </div>
        <span className="font-normal text-[14px] sm:text-[16px] text-cyan">
          {new Date().getFullYear()} © Blake&apos;s Quality Water. All Rights
          Reserved.
        </span>
      </div>
    </Wrapper>
  </footer>
);

export default Footer;
