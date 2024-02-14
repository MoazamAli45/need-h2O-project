import React from "react";
import Wrapper from "../shared/Wrapper";
import { FaqAccordian } from "./FaqAccordian";

const Faq = () => {
  return (
    <section>
      <Wrapper>
        <h2 className="font-bold text-[20px] md:text-[22px]">
          Frequently Asked Questions
        </h2>
        <FaqAccordian />
      </Wrapper>
    </section>
  );
};

export default Faq;
