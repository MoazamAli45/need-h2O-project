"use client";
import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const pathname = usePathname();

  if (pathname === "/dashboard") return children;

  return (
    <>
      <Navigation />
      {children}
      {pathname !== "/book-order" && <Footer />}
    </>
  );
};

export default Layout;
