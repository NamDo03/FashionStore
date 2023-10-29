import React, { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  if (!item || !item.title) {
    return null;
  }

  return (
    <div className="w-[300px]">
      <Link to={`/product/${item._id}`}>
        <img
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="rounded-lg object-cover object-top w-[300px] h-[330px] brightness-90 cursor-pointer"
          src={item && item.img && item.img[hovered ? 1 : 0]}
          alt={item.title}
        />
      </Link>

      <div className="flex items-center justify-between pt-3">
        <div className=" cursor-pointer">
          <Link to={`/product/${item._id}`} className="text-lg py-3">
            {item.title}
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

export default Product;
