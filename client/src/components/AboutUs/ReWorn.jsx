import React from "react";
import reworn from "../../images/about/reworn.webp";
import Return from "../../images/about/Return.jpg";
import repair from "../../images/about/Repair.webp";
import recycle from "../../images/about/Recycle.webp";

const ReWorn = () => {
  return (
    <>
      <div className="flex sm:flex-row flex-col items-center">
        <div className="sm:w-1/2">
          <img src={reworn} alt="" className=" sm:h-[600px] h-[300px]  object-cover" />
        </div>
        <div className="sm:w-1/2 sm:px-14">
          <h2 className="text-3xl font-normal pb-6">About Re-Worn</h2>
          <p className="text-sm leading-6">
            Re-Worn is a take-back service designed to extend the life of
            Assembly Label clothing and support a circular economy. It’s part of
            our long-term commitment to design with the entire lifecycle of our
            clothing in mind, ensuring all products are eventually repaired,
            reused or recycled. We have never sent our product to landfill, and
            it’s our responsibility to ensure your old Assembly Label items
            don’t end up in landfill either.
          </p>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-center text-3xl pb-6 ">How Re-Worn Works</h2>
        <div className="flex flex-row gap-3">
          <div className="w-1/3 text-center">
            <img src={Return} alt="" />
            <h3 className=" py-3">Return</h3>
            <p className="text-sm leading-6 sm:block hidden">
              Contribute Assembly Label items you no longer wear to Re-Worn and
              we’ll make sure they don’t go to landfill. To thank you for
              embracing this circular practice, we’ll gift you 20% off your next
              purchase when you make a contribution.
            </p>
          </div>
          <div className="w-1/3 text-center">
            <img src={repair} alt="" />
            <h3 className=" py-3">Repair</h3>
            <p className="text-sm leading-6 sm:block hidden">
              All items contributed to Re-Worn are thoroughly inspected,
              professionally laundered and, if required, repaired in Sydney
              before becoming part of a Re-Worn collection. These collections
              are available to shop online and at our Re-Worn pop-up locations
              until sold out.
            </p>
          </div>
          <div className="w-1/3 text-center">
            <img src={recycle} alt="" />
            <h3 className=" py-3">Recycle</h3>
            <p className="text-sm leading-6 sm:block hidden">
              Items that are beyond repair are responsibly recycled through our
              recycling partner SCR Group. Every item is sorted and what can’t
              be reused in Australia goes to an Australian-owned partner
              facility in Malaysia, where it is turned into yarn or converted
              into biofuels.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReWorn;
