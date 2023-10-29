import React from "react";
import com1 from "../../images/about/Community1.webp";
import com2 from "../../images/about/Community2.webp";

const Community = () => {
  return (
    <>
      <div className="text-center font-mono flex flex-col gap-6 mt-20 max-w-2xl px-20">
        <h2 className="text-xl">Better Together</h2>
        <p className="text-xs leading-6">
          From the beginning, we have explored opportunities to collaborate and
          connect with like-minded people who contribute to the wellbeing of our
          community. We’re proud of our team and the rewarding relationships
          we’ve built with customers, employees, suppliers and brand and charity
          partners, based on shared values, reciprocal respect and trust.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center">
        <div className="sm:w-1/2">
          <img
            src={com1}
            alt=""
            className=" sm:h-[600px] h-[300px]  object-cover"
          />
        </div>
        <div className="sm:w-1/2 sm:px-14 flex flex-col gap-3">
          <h2 className="text-xl font-normal pb-3">Our Team</h2>
          <p className="text-sm leading-6">
            All Assembly Label employees are representative of our brand.
            Believing that our success comes directly from the wellbeing of our
            people, we promote a balanced lifestyle and encourage our employees
            to take a Mental Health Day every quarter. We harbour a safe and
            healthy working environment where all are welcome and treated
            equally. We also support career development, offering clear
            incentives for employees to remain within our organisation,
            providing in-house and external resources for growth and education.
            Above all, we’re committed to enacting mindful behaviours towards
            everyone and everything we work with, including employees, partners,
            customers and environments.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center">
        <div className="sm:w-1/2 sm:px-14 flex flex-col gap-3">
          <h2 className="text-xl font-normal pb-3">Our Stores & Workplaces</h2>
          <p className="text-sm leading-6">
            We acknowledge that built environments have a crucial role to play
            in supporting human health as part of everyday living. In order to
            create functional, beautiful spaces of enduring value, Assembly
            Label partners with local designers and architects on our retail
            stores and workplaces. To date, we’ve worked with Mr and Mrs White,
            We Are Triibe, Studio GOSS and CM Studio, all of whom share an
            appreciation for minimalist design.
          </p>
        </div>
        <div className="sm:w-1/2">
          <img
            src={com2}
            alt=""
            className="sm:h-[600px] h-[300px]  object-cover"
          />
        </div>
      </div>

      <div className="text-center font-mono flex flex-col gap-6 max-w-2xl px-20">
        <h2 className="text-xl">Branded Partners</h2>
        <p className="text-xs leading-6">
          To complement our clothing, we partner with like-minded brands to
          offer a thoughtful selection of lifestyle products, footwear,
          homewares and accessories.
        </p>
      </div>
    </>
  );
};

export default Community;
