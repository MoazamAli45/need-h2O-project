"use client";
import React, { useRef } from "react";
import Wrapper from "../shared/Wrapper";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PrimaryButton } from "../shared/Button";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICEID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATEID,
        formRef.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY,
        }
      )
      .then(
        () => {
          toast.success("Message sent successfully", {
            duration: 2000,
          });
        },
        (error) => {
          console.error("FAILED...", error.text);
          toast.error("Failed to send message", {
            duration: 2000,
          });
        }
      );
  };

  return (
    <section className="py-12">
      <Wrapper>
        <h2 className="font-bold text-[20px] md:text-[22px]">Contact Us</h2>
        <form
          className="w-full md:w-1/2 flex-col space-y-4 mt-4"
          onSubmit={submitHandler}
          ref={formRef}
        >
          <div className="flex-col space-y-2">
            <Label>Your Name</Label>
            <Input
              type="text"
              placeholder="Enter Your full name"
              required
              name="user_name"
            />
          </div>
          <div className="flex-col space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="Enter Your email address"
              required
              name="user_email"
            />
          </div>
          <div className="flex-col space-y-2">
            <Label>Message</Label>
            <Textarea
              placeholder="Type your message here."
              required
              name="user_project"
            />
          </div>
          <PrimaryButton
            styles={"w-full mt-4"}
            // onSubmit={submitHandler}
            type="submit"
          >
            Send Message
          </PrimaryButton>
        </form>
      </Wrapper>
    </section>
  );
};

export default Contact;
