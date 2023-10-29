import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { categories } from "../../MyLinks";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="lg:px-36 px-5 py-12">
      <h2
        className="font-semibold pb-8 text-xl lg:text-3xl"
        data-aos="fade-right"
      >
        Curated picks
      </h2>
      <div className="flex lg:justify-between sm:justify-evenly justify-center items-center flex-col sm:flex-row flex-wrap lg:flex-nowrap">
        {categories.map((cat) => (
          <div key={cat.btn} className="relative" data-aos="fade-up">
            <img
              src={cat.img}
              alt=""
              className="rounded-lg object-cover object-top h-[290px] w-[290px] brightness-90"
            />
            <button
              onClick={() => navigate(cat.link)}
              className="bg-white -translate-y-16 p-3 mx-auto w-[70%] rounded-lg flex justify-around items-center hover:bg-white/90"
            >
              {cat.btn}
              <BsArrowRight size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
