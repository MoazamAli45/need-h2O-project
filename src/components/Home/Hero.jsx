import React from "react";
import Wrapper from "../shared/Wrapper";
import InputPlacesSearch from "../shared/InputPlacesSearch";

const Hero = () => {
  return (
    <section>
      <Wrapper styles=" px-4 sm:px-8 md:px-24 ">
        <div className="hero-bg   rounded-lg px-4 sm:px-8 md:px-16 py-[80px] sm:py-[100px]  h-[600px]  lg:h-[500px]">
          <h1 className="text-[40px] md:text-[48px] font-extrabold text-center text-white">
            Please enter your address below for phone and order.
          </h1>
          <p className=" text-[16px] font-normal text-white text-center">
            Enter an address to place order
          </p>
          <div className="flex items-center justify-center w-full mt-8">
            <InputPlacesSearch />
          </div>
        </div>
        <p className="text-[14px] text-[#A1824A] font-medium text-center mt-2 ">
          PLEASE NOTE: Due to the amount of deliveries and wait times at the
          uptown we cannot guarantee your delivery will be on the exact time
          selected. Our driver will call you when he is on his way with your
          delivery.
        </p>
      </Wrapper>
    </section>
  );
};

export default Hero;
