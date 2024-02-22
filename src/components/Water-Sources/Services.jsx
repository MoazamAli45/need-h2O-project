"use client";
import React from "react";
import Wrapper from "../shared/Wrapper";
import { PrimaryButton } from "../shared/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const services = [
  "Slows the ageing process",
  "Reduces inflammation",
  "Regulates your body's pH levels",
  "Can help to prevent chronic diseases such as cancer",
  "Colon cleansing properties",
  "Immune system support",
  "Better hydration and skin health",
  "Improves metabolism and increases energy",
  "Can reduce bone loss",
];
const Services = () => {
  const router = useRouter();
  return (
    <section className="py-8">
      <Wrapper>
        <div className="flex xl:flex-row flex-col justify-center gap-6 ">
          <div className="relative max-w-full w-full  xl:w-[500px]  xl:flex-1 h-[350px]   sm:h-[430px]">
            <Image
              src={"/sources/bg-source.jpg"}
              alt="service"
              priority
              fill
              sizes="100% "
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <h2 className="text-[40px] md:text-[48px]  font-extrabold ">
              Natural Spring Water
            </h2>
            <h4 className="text-[20px] font-bold">
              Would you prefer natural spring water with additional health
              benefits, rather than that sourced from the town supply?
            </h4>
            <p className="text-[16px] font-medium text-justify">
              We can provide premium quality natural spring water collected from
              a local aqueduct in the pristine Ararimu Valley. This water source
              has been independently tested and proved to be highly alkaline
              with a pH level of 9.5, and an ORP of -175. Naturally rich in
              minerals including calcium, magnesium, sodium, and potassium; it
              will help you to maintain an optimal state of health and is a
              superior choice for your home and family.
            </p>
            <PrimaryButton
              styles={"justify-self-start self-start"}
              onClick={() => router.push("/about")}
            >
              Learn More
            </PrimaryButton>
          </div>
        </div>
        {/*  Bottom paragraphs */}
        <div className="flex flex-col space-y-8 my-8">
          <div className="flex flex-col space-y-4">
            <h2 className="text-[22px] sm:text-[26px] md:text-[32px] font-bold">
              Reported Health Benefits of Alkaline Water:
            </h2>
            <ul>
              {services.map((item, id) => (
                <li
                  key={id}
                  className="mt-[2px] flex items-center gap-2 font-medium"
                >
                  <span className="text-gray-600 text-[12px]">● </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-bold">
              What do the pH and ORP levels mean?
            </h3>
            <p className="text-[16px] font-medium text-justify">
              The pH level measures how acidic or alkaline a substance is on a
              scale of 0 (acidic) to 14 (alkaline). &apos;Pure&apos; water has a
              neutral pH level of 7, and the human body is built to naturally
              maintain a similar pH level. However there are many factors that
              can impact the delicate balance of acid and alkalinity in our
              body. Our modern diet usually encourages more acidic environment
              which promotes inflammation and disease. Maintaining a more
              alkaline state is said to be beneficial for your health, and
              choosing a water source that is highly alkaline is an easy and
              convenient way to achieve this. Oxidation Reduction Potential
              (ORP) refers to the water&apos;s ability to act as a pro- or
              anti-oxidant. The lower the ORP, the more anti-oxidising the
              water. Negative ORP water can neutralise free radicals which is
              beneficial for cellular health and anti-aging. Standard tap water
              has a positive ORP reading, and many after market water filters
              use a chemical process to try and reduce the ORP, whereas the
              water from the Aratimu Valley has a naturally occurring negative
              ORP, making it safer choice to promote health.
            </p>
            <div className="flex justify-center">
              <PrimaryButton onClick={() => router.push("/")}>
                ORDER NOW
              </PrimaryButton>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-bold">
              Auckland City Water Supply
            </h3>
            <p className="text-[16px] font-medium text-justify">
              Auckland City&apos;s water supply is managed by Watercare — an
              Auckland Council organisation. This water is sourced from dams,
              rivers and aquifers across the Auckland region. It travels to a
              Watercare facility where it is filtered and treated by adding
              chlorine and fluoride. It is then distributed through their pipe
              network to fill points across the Auckland region. We collect the
              water from the various fill points and deliver it to you. For more
              information on where this water comes from and how it is treated,
              <a
                href={"https://www.watercare.co.nz/Water-and-wastewater"}
                className="text-blue-600"
              >
                {" "}
                Watercare website
              </a>
            </p>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Services;
