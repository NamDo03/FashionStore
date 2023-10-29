import React from "react";
import { CiBadgeDollar } from "react-icons/ci";
import { FaRegSmileBeam } from "react-icons/fa";
import { LiaShippingFastSolid, LiaDollySolid } from "react-icons/lia";
const Service = () => {
  return (
    <div className="lg:px-36 px-5 py-12">
      <div className="flex mb-3 lg:mb-14" data-aos="fade-right">
        <div className="lg:border-r-[3px] border-0 border-black lg:w-3/5 w-full">
          <h2 className="text-xl lg:text-3xl font-semibold py-2 pr-4 w-full lg:w-[55%]">
            We provide best customer experimences
          </h2>
        </div>
        <div className="w-2/5 items-center justify-end hidden lg:flex">
          <p className="text-text text-sm">
            We ensure our customer have the best shopping experimence
          </p>
        </div>
      </div>
      <div className="flex justify-between gap-10 lg:gap-20 flex-col sm:flex-row">
        <div className="flex flex-col gap-3" data-aos="fade-up">
          <div className="p-4 bg-primary-second w-fit rounded-lg">
            <CiBadgeDollar size={24} />
          </div>
          <h3 className="font-semibold text-sm lg:text-lg ">
            Original Products
          </h3>
          <span className="text-text text-xs lg:text-sm ">
            We provide money back guarantee if the product are not original
          </span>
        </div>
        <div
          className="flex flex-col gap-3"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="p-4 bg-primary-second w-fit rounded-lg">
            <FaRegSmileBeam size={24} />
          </div>
          <h3 className="font-semibold text-sm lg:text-lg ">
            Satisfaction Guarantee
          </h3>
          <span className="text-text text-xs lg:text-sm ">
            Exchange the product you've purchased if it doesn't fit on you
          </span>
        </div>
        <div
          className="flex flex-col gap-3"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <div className="p-4 bg-primary-second w-fit rounded-lg">
            <LiaDollySolid size={24} />
          </div>
          <h3 className="font-semibold text-sm lg:text-lg ">
            New Arrival Everyday
          </h3>
          <span className="text-text text-xs lg:text-sm ">
            We updates our collections almost everyday
          </span>
        </div>
        <div
          className="flex flex-col gap-3"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <div className="p-4 bg-primary-second w-fit rounded-lg">
            <LiaShippingFastSolid size={24} />
          </div>
          <h3 className="font-semibold text-sm lg:text-lg ">
            Fast & Free Shipping
          </h3>
          <span className="text-text text-xs lg:text-sm ">
            We offer fast and free shipping for our loyal customers
          </span>
        </div>
      </div>
    </div>
  );
};

export default Service;
