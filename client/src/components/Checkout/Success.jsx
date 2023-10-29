import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartSlice";

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCart());
  }, [dispatch]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl text-green-500 font-semibold pb-10">
        Checkout Successful
      </h1>
      <p>Your order might take some time to process.</p>
      <p>Your order will be delivered as soon as possible.</p>
      <p>
        Incase of any inqueries contact the support at{" "}
        <strong>support@onlineshop.com</strong>
      </p>
    </div>
  );
};

export default Success;
