"use client";
import Image from "next/image";
import React from "react";
import { PrimaryButton } from "../shared/Button";
import Wrapper from "../shared/Wrapper";
import image1 from "../../../public/home/tank1.jpg";
import image2 from "../../../public/home/tank3.jpg";
import image3 from "../../../public/home/tank2.jpg";
import { useRouter } from "next/navigation";

const services = [
  {
    id: 1,
    content: "Residential Water Tanks",
    image: image1,
  },
  {
    id: 2,
    content: "Swimming Pools & Ponds",
    image: image2,
  },
  {
    id: 3,
    content: "Commercial Sites",
    image: image3,
  },
];

const Services = () => {
  const router = useRouter();
  return (
    <section className="my-12">
      <Wrapper>
        <div className="flex lg:flex-row flex-col gap-6 ">
          <div className="relative max-w-full w-full  lg:w-[500px]  lg:flex-1  h-[350px]">
            <Image
              src={"/about/about.jpg"}
              alt="service"
              priority
              fill
              sizes="100% "
              className="w-full h-full object-cover object-left rounded-lg"
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
        {/*   Grid */}
        <div className="grid  grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 sm:space-x-4 mt-12 space-y-4 sm:space-y-0 ">
          {services.map((service) => (
            <div key={service.id} className="flex-col space-y-3  ">
              <div className="w-full h-[300px] relative ">
                <Image
                  src={service.image}
                  alt={service.content}
                  fill
                  className="w-full h-full object-cover rounded-lg"
                  priority
                />
              </div>
              <p className="font-medium text-[16px]">{service.content}</p>
            </div>
          ))}
        </div>
        {/*  Quality Service */}
        <div className="mt-6 sm:mt-14 flex flex-col space-y-3">
          <div className="flex flex-col space-y-4">
            <h2 className="font-bold text-[28px] md:text-[32px] leading-[30px] md:leading-[40px]">
              Superior Quality Spring Water
            </h2>
            <p>
              Do you dislike the taste of chlorinated water from the town
              supply? Would you prefer natural spring water with additional
              health benefits?
            </p>
          </div>
          <div className="h-[500px] w-full service-bg py-6 rounded-lg px-4 flex flex-col justify-end">
            <p className="  text-white font-bold text-[14px] md:text-[16px]  justify-self-end">
              We can provide premium quality water from a local aqueduct in the
              pristine Aranival Valley. It is naturally rich in minerals
              including calcium, magnesium, sodium, and potassium. With a pH of
              9, this alkaline water helps neutralize the acid in your body,
              helping you to maintain an optimal state of health and making it a
              superior choice for your home and family.
            </p>
          </div>
          <div className="flex space-x-4">
            <PrimaryButton onClick={() => router.push("/about")}>
              Learn More
            </PrimaryButton>
            <button className="font-bold">Contact Us</button>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Services;
