import React from "react";
import bp1 from "../../images/about/BP1.webp";
import bp2 from "../../images/about/BP2.webp";

const Business = () => {
  return (
    <>
      <div className="text-center font-mono flex flex-col gap-6 mt-20 max-w-2xl sm:px-20">
        <h2 className="text-xl">
          Beyond thoughtful design and choosing to work with natural fibres, we
          consider the impact of all of our business practices on our community
          and environment.
        </h2>
        <p className="text-xs leading-6">
          We exercise responsible purchasing practices, and through careful
          calculations, aim to only put into manufacture what we expect to sell,
          with a target that 10% of our garments end up on markdown. For the
          2021 fiscal year, we achieved that target.
        </p>
        <p className="text-xs leading-6">
          We see the traditional sale model as a failure, which is why we
          created our Choose What You Pay Campaigns, turning an oversupply issue
          into an opportunity to fundraise for worthy causes.
        </p>
        <p className="text-xs leading-6">
          We are working towards a goal that no Assembly Label products should
          end up in landfill. From thoughtful product design to reimagining our
          packaging, we are working hard to ensure that we maintain the best
          business practices.
        </p>
        <p className="text-xs leading-6">
          Our first report on business and manufacturing practices will be
          released in December 2022.
        </p>
      </div>

      <div className="flex sm:flex-row flex-col items-center">
        <div className="sm:w-1/2">
          <img
            src={bp1}
            alt=""
            className="sm:h-[600px] h-[300px]  object-cover"
          />
        </div>
        <div className="sm:w-1/2 sm:px-14 flex flex-col gap-3">
          <h2 className="text-xl font-normal pb-3">Labelling and Packaging</h2>
          <p className="text-sm leading-6">
            We are working towards a goal of using zero single-use plastic in
            our supply chain.
          </p>
          <p className="text-sm leading-6">
            In 2021, we undertook a thorough packaging audit to ensure that
            going forward, all materials we use to transport our products are
            either compostable or recyclable.
          </p>
          <p className="text-sm leading-6">
            We now use non-plastic alternatives such as biodegradable and
            compostable satchels from The Better Packaging Co. and recyclable
            honeycomb kraft paper wrap.
          </p>
          <p className="text-sm leading-6">
            The pallet wrap, tape and shipping labels we now use are
            biodegradable and compostable, our boxes are recyclable and the
            pallets we use in our warehouses are recycled.
          </p>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col items-center">
        <div className="sm:w-1/2 sm:px-14 flex flex-col gap-3">
          <h2 className="text-xl font-normal pb-3">Energy Efficiency</h2>
          <p className="text-sm leading-6">
            We partner with Energy Locals, a carbon-neutral energy provider that
            provides credits to offset the energy usage of the business. Through
            Energy Locals, we purchase our energy through Cape Byron Power,
            operated by Cape Byron Management, consisting of two 30 MW
            biomass-fired power stations on the NSW North Coast. Together, these
            form one of the largest renewable baseload generators in Australia.
            The electricity is predominantly produced from sugarcane waste and
            certain types of wood residues and energy crops known as biomass
            fuel.
          </p>
        </div>
        <div className="w-1/2">
          <img
            src={bp2}
            alt=""
            className="sm:h-[600px] h-[300px]  object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Business;
