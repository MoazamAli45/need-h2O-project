import React from "react";
import Wrapper from "../shared/Wrapper";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PrimaryButton } from "../shared/Button";

const Contact = () => {
  return (
    <section className="my-12">
      <Wrapper>
        <h2 className="font-bold text-[20px] md:text-[22px]">Contact Us</h2>
        <div className="w-full md:w-1/2 flex-col space-y-4 mt-4">
          <div className="flex-col space-y-2">
            <Label>Your Name</Label>
            <Input type="text" placeholder="Enter Your full name" />
          </div>
          <div className="flex-col space-y-2">
            <Label>Email Address</Label>
            <Input type="text" placeholder="Enter Your email address" />
          </div>
          <div className="flex-col space-y-2">
            <Label>Message</Label>
            <Textarea placeholder="Type your message here." />
          </div>
          <PrimaryButton styles={"w-full mt-4"}>Send Message</PrimaryButton>
        </div>
      </Wrapper>
    </section>
  );
};

export default Contact;
