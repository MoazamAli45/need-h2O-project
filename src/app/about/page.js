import React from "react";
import Image from "next/image";
import Navigation from "@/components/shared/Navigation";
import Wrapper from "@/components/shared/Wrapper";
import AboutSection from "@/components/About/AboutSection";
import Footer from "@/components/shared/Footer";

const About = () => {
  return (
    <div className="bg-bluePrimary-dark">
      <AboutSection />
    </div>
  );
};

export default About;
