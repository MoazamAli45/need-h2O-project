import Image from "next/image";
import React from "react";
import { PrimaryButton } from "../shared/Button";
import Wrapper from "../shared/Wrapper";

const Services = () => {
  return (
    <section className="my-12">
      <Wrapper>
        <div className="flex lg:flex-row flex-col gap-6 ">
          <div className="relative max-w-full w-full  lg:w-[500px]  lg:flex-1  h-[400px] lg:h-[350px]">
            <Image
              src={"/home/service.png"}
              alt="service"
              priority
              fill
              sizes="100% "
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="text-[40px] md:text-[48px]  font-extrabold ">
              Need a water delivery? We&apos;re at your service!
            </h2>
            <p className="text-[16px] font-medium">
              Delivering 11,000 litres per load. With competitive prices and
              quick delivery timeframes, we&apos;re the perfect choice.
            </p>
            <PrimaryButton styles={"justify-self-start self-start"}>
              Learn More
            </PrimaryButton>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Services;
