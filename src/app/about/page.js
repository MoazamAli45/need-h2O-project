import React from "react";
import Image from "next/image";
import Navigation from "@/components/shared/Navigation";
import Wrapper from "@/components/shared/Wrapper";
import AboutSection from "@/components/About/AboutSection";
import Footer from "@/components/Home/Footer";

const About = () => {
  return (
    <>
      <Navigation />

      <AboutSection />
      <Footer />
    </>
  );
};

export default About;
