"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import LoginPage from "@/components/Dashboard/LoginPage";
import React from "react";

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const authenticateHandler = () => {
    setIsAuthenticated(true);
  };

  // return isAuthenticated ? (
  //   <Dashboard />
  // ) : (
  //   <LoginPage authenticateHandler={authenticateHandler} />
  // );
  return <Dashboard />;
};

export default Page;
