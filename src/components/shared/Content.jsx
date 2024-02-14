import React from "react";
import Navigation from "../Home/Navigation";

const Content = ({ children }) => {
  return (
    <>
      <Navigation />
      <body>{children}</body>
    </>
  );
};

export default Content;
