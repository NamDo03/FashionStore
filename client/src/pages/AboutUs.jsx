import React from "react";
import banner from "../images/about/AboutBanner.webp";
import About from "../components/AboutUs/About";
import ReWorn from "../components/AboutUs/ReWorn";
import Business from "../components/AboutUs/Business";
import Suppliers from "../components/AboutUs/Suppliers";
import Community from "../components/AboutUs/Community";

const AboutUs = () => {
  return (
    <div className="py-20 flex flex-col items-center scroll-smooth">
      <div
        style={{ backgroundImage: `url(${banner})` }}
        className="h-[600px] w-full bg-top bg-cover flex flex-col justify-center items-center gap-8 text-center"
      >
        <h1 className=" font-serif text-4xl">How We Work.</h1>
        <p className=" text-sm">
          As a business, we are constantly re-evaluating our work in an effort
          to better contribute to
          <br />
          our community and act in a way that is socially and environmentally
          responsible.&nbsp;
        </p>
      </div>
      <div className="uppercase border-b w-full">
        <ul className="flex flex-row justify-center items-center lg:gap-10 gap-2 py-5 lg:px-6 flex-wrap">
          <li className=" cursor-pointer hover:underline underline-offset-8 lg:text-sm text-xs">
            <a href="#about">About</a>
          </li>
          <li className=" cursor-pointer hover:underline underline-offset-8 lg:text-sm text-xs">
            <a href="#reworn">Re-worn</a>
          </li>
          <li className=" cursor-pointer hover:underline underline-offset-8 lg:text-sm text-xs">
            <a href="#business"> BUSINESS PRACTICES</a>
          </li>
          <li className=" cursor-pointer hover:underline underline-offset-8 lg:text-sm text-xs">
            <a href="#suppliers">SUPPLIERS</a>
          </li>
          <li className=" cursor-pointer hover:underline underline-offset-8 lg:text-sm text-xs">
            <a href="#community">Community</a>
          </li>
        </ul>
      </div>

      <div
        id="about"
        className="text-center font-mono flex flex-col lg:gap-6 gap-4 my-10 max-w-xl lg:max-w-2xl px-5 py-3 lg:px-20 lg:py-10"
      >
        <About />
      </div>

      <div id="reworn" className="px-5 py-3 lg:px-20 lg:py-10">
        <ReWorn />
      </div>

      <div
        id="business"
        className="px-5 py-3 lg:px-20 lg:py-10 flex flex-col items-center gap-20"
      >
        <Business />
      </div>

      <div
        id="suppliers"
        className="px-5 py-3 lg:px-20 lg:py-10 flex flex-col items-center gap-20"
      >
        <Suppliers />
      </div>

      <div
        id="community"
        className="px-5 py-3 lg:px-20 lg:py-10 flex flex-col items-center gap-20"
      >
        <Community />
      </div>
    </div>
  );
};

export default AboutUs;
