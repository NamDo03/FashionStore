import React from "react";
import logo from "../images/logo.png";
import pm1 from "../images/payment/pm1.png";
import pm2 from "../images/payment/pm2.png";
import pm3 from "../images/payment/pm3.png";

export const Footer = () => {
  return (
    <footer className=" lg:px-36 px-5 lg:pt-12 pt-6 bg-primary-second mt-10">
      <div className="flex sm:flex-row lg:gap-0 gap-6 flex-col pb-10">
        <div className="basis-3/12 sm:text-start text-center">
          <div className="text-primary font-bold lg:text-3xl text-xl flex cursor-pointer w-full lg:w-auto pb-3 items-center justify-center sm:justify-start">
            <img src={logo} alt="logo" className="lg:h-16 h-12" />
            <p>arwin</p>
          </div>
          <p className="text-text lg:text-sm text-xs ">
            Specializes in providing high-quality, stylish products for your
            wardrobe
          </p>
        </div>
        <div className="flex basis-7/12 justify-evenly">
          <div className="">
            <h3 className="text-primary uppercase font-semibold lg:text-base text-sm pb-4">Shop</h3>
            <ul className="flex flex-col gap-2">
              <li className="text-text lg:text-sm text-xs cursor-pointer hover:text-hover">
                All Collections
              </li>
              <li className="text-text lg:text-sm text-xs cursor-pointer hover:text-hover">
                Winter Edition
              </li>
              <li className="text-text lg:text-sm text-xs cursor-pointer hover:text-hover">
                Discount
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="text-primary uppercase font-semibold lg:text-base text-sm pb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2">
              <li className="text-text lg:text-sm text-xs cursor-pointer hover:text-hover">
                About Us
              </li>
              <li className="text-text lg:text-sm text-xs cursor-pointer hover:text-hover">
                Contact
              </li>
              <li className="text-text lg:text-sm text-xs cursor-pointer hover:text-hover">
                Affiliates
              </li>
            </ul>
          </div>
          <div className="">
            <h3 className="text-primary uppercase font-semibold lg:text-base text-sm pb-4">
              Support
            </h3>
            <ul className="flex flex-col gap-2">
              <li className="text-text lg:text-sm text-xs cursor-pointer hover:text-hover">
                FAQs
              </li>
              <li className="text-text lg:text-sm text-xs cursor-pointer hover:text-hover">
                Cookie Policy
              </li>
              <li className="text-text lg:text-sm text-xs cursor-pointer hover:text-hover">
                Terms of Use
              </li>
            </ul>
          </div>
        </div>
        <div className="basis-2/12 text-center">
          <h3 className=" uppercase text-primary font-semibold lg:text-base text-sm pb-4">
            Payment methods
          </h3>
          <div className="flex justify-evenly">
            <img className="lg:h-[20px] h-[10px]" src={pm1} alt="" />
            <img className="lg:h-[20px] h-[10px]" src={pm3} alt="" />
            <img className="lg:h-[20px] h-[10px]" src={pm2} alt="" />
          </div>
        </div>
      </div>
      <div className="border-t text-center py-5 text-text lg:text-sm text-xs border-gray-300">
        Copyright © 2023 DHNam. All rights reserved.
      </div>
    </footer>
  );
};
