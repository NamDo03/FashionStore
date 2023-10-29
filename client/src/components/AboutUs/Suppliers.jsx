import React from "react";
import suppliers from "../../images/about/suppliers.webp";

const Suppliers = () => {
  return (
    <>
      <div className="text-center font-mono flex flex-col gap-6 mt-20 max-w-5xl sm:px-20">
        <h2 className="text-lg">
          We choose our suppliers carefully, based on their expertise,
          workmanship and our shared values. When possible, we visit them
          annually, working closely together to ensure that the highest
          standards are maintained.
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center">
        <div className="sm:w-1/2 sm:px-14 flex flex-col gap-3">
          <p className="text-sm leading-6">
            Each factory we work with is independently audited and is required
            to sign our Code of Conduct, based upon the Ethical Trading
            Initiative Base Code. It ensures that the following standards are
            maintained: working conditions are safe and hygienic for employees,
            no discrimination or harsh or inhumane treatment is condoned, no
            child labour, regular employment is offered, and employees wages
            meet, at a minimum, national legal standards. Below are the profiles
            of our main suppliers—many of whom we’ve worked with for years.
            We’ll be updating this regularly with information on the factories,
            what they make for Assembly Label and why we choose to work with
            them.
          </p>
          <p className="text-sm leading-6">
            Below are the profiles of our main suppliers—many of whom we’ve
            worked with for years. We’ll be updating this regularly with
            information on the factories, what they make for Assembly Label and
            why we choose to work with them.
          </p>
        </div>
        <div className="sm:w-1/2">
          <img src={suppliers} alt="" className="sm:h-[600px] h-[300px] object-cover" />
        </div>
      </div>
    </>
  );
};

export default Suppliers;
