import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { PiHandbagDuotone, PiUserSquareDuotone } from "react-icons/pi";
import { HiHome } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const sidebar = [
    { name: "Dashboard", icon: HiHome, link: "/admin/dashboard" },
    { name: "Products", icon: PiHandbagDuotone, link: "/admin/products" },
    { name: "Users", icon: PiUserSquareDuotone, link: "/admin/users" },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log("logout");
    navigate("/");
  };
  return (
    <aside className="sticky left-0 top-0 z-[9999] h-screen py-6 px-10 w-64 border-r border-gray-200 flex justify-between flex-col">
      <div className="">
        <div className="z-50 font-bold text-3xl flex cursor-pointer w-full lg:w-auto justify-between items-center">
          <div
            onClick={() => navigate("/")}
            className="flex items-center text-primary"
          >
            <img src={logo} alt="logo" className="h-16" />
            <p>arwin</p>
          </div>
        </div>
        <ul className="flex flex-col gap-y-4 pt-20">
          {sidebar.map((s, index) => (
            <li
              key={index}
              onClick={() => navigate(s.link)}
              className="flex gap-x-4 items-center py-2 cursor-pointer text-gray-500 hover:text-primary group"
            >
              <span className="absolute w-1.5 h-8 bg-primary rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
              <s.icon className="text-2xl" />
              <span className="text-lg font-medium">{s.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="flex gap-x-4 items-center py-2 cursor-pointer text-gray-500 hover:text-primary group justify-self-end"
      >
        <span className="absolute w-1.5 h-8 bg-primary rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
        <FiLogOut className="text-2xl" />
        <span className="text-lg font-medium">Log Out</span>
      </button>
    </aside>
  );
};

export default Sidebar;
