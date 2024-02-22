import React from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import { CiFacebook } from "react-icons/ci";
import { CiTwitter } from "react-icons/ci";
import { RxInstagramLogo } from "react-icons/rx";

const Footer = ({ styles = "bg-black", textFooter = "white" }) => (
  <footer className={`py-4 md:py-8 ${styles}`}>
    <Wrapper>
      {/* <div className="flex justify-around">
        <Link
          href="/"
          className={`font-normal text-[14px] sm:text-[16px] text-${textFooter}`}
        >
          Privacy Policy
        </Link>
        <Link
          href="/"
          className={`font-normal text-[14px] sm:text-[16px] text-${textFooter}`}
        >
          Terms of Service
        </Link>
      </div> */}
      <div className="mt-4 flex flex-col gap-2 items-center justify-center">
        {/* <div className="flex space-x-4">
          <CiFacebook className={`text-[20px] text-${textFooter}`} />
          <CiTwitter className={`text-[20px] text-${textFooter}`} />
          <RxInstagramLogo className={`text-[20px] text-${textFooter}`} />
        </div> */}
        <span
          className={`font-normal text-[14px] sm:text-[16px] text-${textFooter}`}
        >
          {new Date().getFullYear()} © Blake&apos;s Quality Water. All Rights
          Reserved.
        </span>
      </div>
    </Wrapper>
  </footer>
);

export default Footer;
