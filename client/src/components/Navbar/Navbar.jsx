import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavLink from "./NavLink";
import logo from "../../images/logo.png";
import { MdMenu, MdClose } from "react-icons/md";
import { TbShoppingCart } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { BiSearchAlt2 } from "react-icons/bi";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { motion } from "framer-motion";
import Search from "../../pages/Search";

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const dialogRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setShowDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    dispatch(logout());
    console.log("logout");
    navigate("/");
  };
  return (
    <nav className="bg-white shadow-default fixed z-[50] w-full">
      <div className="flex items-center justify-between">
        <div className="z-50 font-bold text-3xl flex cursor-pointer w-full lg:w-auto justify-between py-3 pl-12 items-center">
          <div
            onClick={() => navigate("/")}
            className="flex items-center text-primary"
          >
            <img src={logo} alt="logo" className="h-16" />
            <p>arwin</p>
          </div>
        </div>

        <ul className="lg:flex hidden items-center gap-6 text-lg">
          <NavLink setOpen={setOpen} />
          <li className="font-medium text-lg">
            <div
              onClick={() => navigate("/aboutus")}
              className="py-7 px-3 inline-block hover:text-hover cursor-pointer "
            >
              About
            </div>
          </li>
        </ul>

        <div className="flex text-lg items-center">
          <span
            onClick={() => setShowSearch(true)}
            className="cursor-pointer px-5 hover:text-hover"
          >
            <BiSearchAlt2 size={28} />
          </span>

          <div
            onClick={() => setShowCart(true)}
            className="relative cursor-pointer px-5"
          >
            <TbShoppingCart size={28} className="hover:text-hover" />
            <span className="text-base w-[24px] h-[24px] rounded-full bg-primary text-white absolute flex items-center justify-center -top-3 right-2">
              {products.length}
            </span>
          </div>

          {user ? (
            <div
              ref={dialogRef}
              onClick={() => setShowDialog(!showDialog)}
              className="relative lg:block hidden pl-5 pr-12"
            >
              <FaRegUser
                size={28}
                className="hover:text-hover cursor-pointer"
              />
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{
                  y: showDialog ? 0 : -50,
                  opacity: showDialog ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
                className={`${
                  showDialog ? "flex" : "hidden"
                } bg-white absolute shadow-[0_3px_10px_rgb(0,0,0,0.2)] right-8 top-12  flex-col px-4 py-3`}
              >
                <span className="border-b px-6 py-2 text-base whitespace-nowrap">
                  {"Hello! " + user.username}
                </span>
                {user.isAdmin && (
                  <span
                    onClick={() => navigate("/admin/dashboard")}
                    className="px-6 py-3 text-base cursor-pointer hover:bg-primary-second flex flex-row justify-between items-center"
                  >
                    Admin <RxDashboard />
                  </span>
                )}
                <span
                  onClick={handleLogout}
                  className="px-6 py-3 text-base cursor-pointer hover:bg-primary-second flex flex-row justify-between items-center"
                >
                  Logout <FiLogOut />
                </span>
              </motion.div>
            </div>
          ) : (
            <div className="lg:block hidden pr-12 pl-5">
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Log in
              </button>
            </div>
          )}
          <div
            className="z-50 text-3xl lg:hidden px-5"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdClose /> : <MdMenu />}
          </div>
        </div>

        {showSearch && <Search setShowSearch={setShowSearch} />}

        {/*Mobile nav*/}
        <ul
          className={`z-40 lg:hidden flex flex-col bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
          duration-500  ${open ? "left-0" : "left-[-100%]"}`}
        >
          <NavLink />
          <li className="font-medium text-lg w-full">
            <div
              onClick={() => navigate("/aboutus")}
              className="py-7 px-3 inline-block"
            >
              About
            </div>
          </li>

          {user ? (
            <li
              onClick={handleLogout}
              className="font-medium text-lg w-full cursor-pointer"
            >
              <div className="py-7 px-3 inline-block">Logout</div>
            </li>
          ) : (
            <div className="py-5">
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Log in
              </button>
            </div>
          )}
        </ul>
        {/*End Mobile nav*/}
      </div>
      {showCart && <Cart setShowCart={setShowCart} />}
    </nav>
  );
};

export default Navbar;
