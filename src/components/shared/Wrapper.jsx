import React from "react";

const Wrapper = ({ children, styles = "px-4 sm:px-8 md:px-24" }) => {
  return (
    <div className={`w-full ${styles}`}>
      <div className="w-full h-full max-w-[1400px] m-auto md:px-8 px-4">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
