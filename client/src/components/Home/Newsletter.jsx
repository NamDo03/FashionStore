import React from "react";
import { HiOutlineMail } from "react-icons/hi";
export const Newsletter = () => {
  return (
    <div className="lg:px-36 px-5 py-12" data-aos="zoom-in">
      <div className="text-center lg:w-[54%] mx-auto">
        <p className="font-medium sm:text-3xl text-xl">
          Subscribe to our newsletter to get updates to our latest collections
        </p>
        <p className="text-hover pt-5 pb-6 text-sm">
          Get 20% off on your first order just by subscribing to our newsletter
        </p>
        <div className="flex gap-2 justify-center items-center pb-4">
          <div className="relative w-[50%]">
            <input
              type="text"
              className="border text-text py-3 pl-11 rounded-lg bg-primary-second w-full sm:text-base text-xs"
              placeholder="Enter your email"
            />
            <p className="absolute top-[28%] text-text left-3">
              <HiOutlineMail size={22} />
            </p>
          </div>
          <button className="bg-primary text-white rounded-lg py-3 px-5 hover:bg-primary/90">
            Subscribe
          </button>
        </div>
        <p className="text-xs text-text">
          You will be able to unsubscribe at any time.
        </p>
        <p className="text-xs text-text">
          Read our Privacy Policy
          <u className="pl-1 cursor-pointer text-black font-medium">here</u>
        </p>
      </div>
    </div>
  );
};
