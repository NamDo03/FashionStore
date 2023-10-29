import React, { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="sm:w-[375px] w-[360px]">
      <Link to={`/product/${item._id}`}>
        <img
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="rounded-lg object-cover object-top sm:h-[450px] sm:w-[375px] w-[360px] h-[350px] brightness-90"
          src={item && item.img && item.img[hovered ? 1 : 0]}
          alt={item.title}
        />
      </Link>
      <div className="flex items-center justify-between pt-3">
        <div className="">
          <Link to={`/product/${item._id}`} className="text-lg cursor-pointer">
            {item.title}t
          </Link>
          <p className="font-semibold text-xl text-primary">${item.price}</p>
        </div>
        <button className="p-4 bg-primary text-white rounded-lg hover:bg-primary/90">
          <Link to={`/product/${item._id}`}>
            <BsCartPlus size={24} />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Card;
