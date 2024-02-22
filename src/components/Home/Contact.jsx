"use client";
import React, { useRef } from "react";
import Wrapper from "../shared/Wrapper";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PrimaryButton } from "../shared/Button";
import { toast } from "sonner";

const Contact = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const submitHandler = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;

    toast.success("Message sent successfully", {
      duration: 2000,
    });
  };

  return (
    <section className="py-12">
      <Wrapper>
        <h2 className="font-bold text-[20px] md:text-[22px]">Contact Us</h2>
        <div className="w-full md:w-1/2 flex-col space-y-4 mt-4">
          <div className="flex-col space-y-2">
            <Label>Your Name</Label>
            <Input
              type="text"
              placeholder="Enter Your full name"
              ref={nameRef}
            />
          </div>
          <div className="flex-col space-y-2">
            <Label>Email Address</Label>
            <Input
              type="text"
              placeholder="Enter Your email address"
              ref={emailRef}
            />
          </div>
          <div className="flex-col space-y-2">
            <Label>Message</Label>
            <Textarea placeholder="Type your message here." ref={messageRef} />
          </div>
          <PrimaryButton styles={"w-full mt-4"} onClick={submitHandler}>
            Send Message
          </PrimaryButton>
        </div>
      </Wrapper>
    </section>
  );
};

export default Contact;
