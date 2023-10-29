import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/cartSlice";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-4 my-3">
      <div className="w-[100px]">
        <img
          className=" object-cover"
          src={product.img[0]}
          alt={product.title}
        />
      </div>
      <div className="flex flex-col items-stretch justify-between flex-grow text-sm relative">
        <span
          onClick={() => dispatch(removeProduct(product))}
          className="text-base text-gray-400 hover:opacity-60 cursor-pointer absolute right-2"
        >
          <MdClose />
        </span>
        <div className="flex flex-col">
          <span>{product.title}</span>
          <div className="">
            <span>{product.selectedSize}</span>
            {product.selectedColor && <span> / {product.selectedColor}</span>}
          </div>
        </div>
        <div className="flex rounded-lg mt-2">
          <span className="flex items-center justify-center mr-3">QTY</span>
          <span
            onClick={() => dispatch(decreaseQuantity(product))}
            className="w-7 h-7 flex items-center justify-center cursor-pointer"
          >
            -
          </span>
          <span className="w-7 h-7 flex items-center justify-center">
            {product.quantity}
          </span>
          <span
            onClick={() => dispatch(increaseQuantity(product))}
            className="w-7 h-7 flex items-center justify-center cursor-pointer"
          >
            +
          </span>
        </div>
        <div className="mt-auto">${product.price * product.quantity}</div>
      </div>
    </div>
  );
};

export default CartItem;
