import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../redux/cartSlice";
import axios from "axios";

const Cart = ({ setShowCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  console.log(cart.product);
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleCheckout = async () => {
    axios
      .post("http://localhost:5000/api/stripe/create-checkout-session", {
        userId: user._id,
        cart,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[99] flex justify-end">
      <div
        className="bg-black/40 absolute top-0 left-0 w-full h-full"
        onClick={() => setShowCart(false)}
      ></div>
      <motion.div
        initial={{ transform: "translateX(100%)" }}
        animate={{ transform: "translateX(0)" }}
        transition={{ duration: 0.3 }}
        className="h-full w-[480px] bg-white p-5 relative z-50 flex flex-col"
      >
        <div className="flex justify-between items-center py-4 border-b border-black/10">
          <span className=" uppercase text-xl font-medium">Shopping Cart</span>
          <span
            onClick={() => setShowCart(false)}
            className="items-end text-2xl hover:opacity-60 cursor-pointer"
          >
            <MdClose />
          </span>
        </div>

        {!cart?.products.length && (
          <div className="flex flex-col items-center gap-5 mt-24">
            <span className="text-9xl opacity-50">
              <BsCartX />
            </span>
            <span>No products in cart.</span>
            <button
              onClick={() => {
                navigate("/");
                setShowCart(false);
              }}
              className="bg-primary text-white py-3 px-7 rounded-lg cursor-pointer hover:bg-primary/90"
            >
              Return To Shop
            </button>
          </div>
        )}

        {!!cart?.products.length && (
          <>
            <div className="flex-grow overflow-auto scrollbar-hide scroll-smooth">
              {cart.products.map((product, indexP) => (
                <CartItem key={indexP} product={product} />
              ))}
            </div>

            <div className="border-t border-black/10 sticky bottom-0 flex flex-col">
              <div className="flex justify-between py-4 border-b border-black/10">
                <span>Subtotal:</span>
                <span>${cart.total}</span>
              </div>
              <div className="py-4 w-full">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-white py-3 px-7 rounded-lg cursor-pointer hover:bg-primary/90"
                >
                  Checkout
                </button>
              </div>
              <span
                onClick={() => dispatch(resetCart())}
                className="cursor-pointer uppercase text-red-500 underline hover:text-red-400"
              >
                reset
              </span>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;
