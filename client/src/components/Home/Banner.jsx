import React from "react";
import { BsArrowRight } from "react-icons/bs";

const Banner = () => {
  return (
    <div className="lg:px-36 px-5 py-12" data-aos="zoom-in">
      <div className="flex bg-primary rounded-lg sm:flex-row flex-col">
        <img
          src="https://assemblylabel.com/cdn/shop/files/2.-Business-Practices-Redefining-Value_6f70c024-c9e1-4879-88d3-6f3c4aa9c342_1920x.jpg?v=1637626162"
          alt="
    "
          className="sm:w-[45%] object-cover rounded-l-lg"
        />
        <div className="sm:w-[55%] py-12 px-14">
          <p className="uppercase text-text lg:text-base text-sm">
            Limited offer
          </p>
          <p className="text-white font-medium lg:text-5xl text-3xl pt-2 lg:pb-10 pb-5">
            35% off only this friday and get special gift
          </p>
          <button className="bg-white py-3 px-6 rounded-lg flex items-center hover:bg-white/90">
            <p className="pr-3">Grab it now</p>
            <p>
              <BsArrowRight size={24} />
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
