import React, { useState } from "react";
import logo from "../images/logo.png";
import signupImg from "../images/signup.webp";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { publicRequest } from "../requestMethod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = async (data) => {
    try {
      const res = await publicRequest.post("/auth/signup", data);
      res.data && window.location.replace("/login");
      toast.success("Sign Up Successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Sign Up Failed.");
    }
  };

  return (
    <div className="w-full h-screen flex  items-start">
      <div className="relative w-1/2 h-full lg:flex flex-col hidden">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4">Hello, Friend!</h1>
          <p className="text-xl text-white">
            Create an account to Join Our Community.
          </p>
        </div>
        <img className="w-full h-full object-cover" src={signupImg} alt="" />
      </div>

      <div className="lg:w-1/2 w-full h-full bg-[#f5f5f5] flex items-center flex-col lg:px-20 md:px-14 px-8 justify-around">
        <div className="flex items-center self-start text-primary">
          <img src={logo} alt="logo" className="h-20" />
          <p className="font-bold text-4xl">arwin</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col md:max-w-[550px] md:px-14 px-3"
        >
          <div className="w-full flex flex-col justify-center items-center mb-20 gap-2">
            <h3 className="text-3xl font-semibold">Signup</h3>
            <p className="text-base text-center">
              Please fill in all the required fields correctly.
            </p>
          </div>

          <div className="w-full flex flex-col gap-5">
            <div className="">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required...",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email must be valid",
                  },
                })}
                placeholder="Enter your email"
                className="w-full py-2 bg-transparent border-b border-black outline-none focus:ouline-none text-sm md:text-base"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.email?.message}</p>

            <div className="">
              <input
                type="text"
                {...register("username", {
                  required: "Username is Required...",
                  minLength: {
                    value: 3,
                    message: "Username must be atleast 3 characters long...",
                  },
                  maxLength: {
                    value: 30,
                    message: "Username must be atmost 30 characters long...",
                  },
                })}
                placeholder="Enter your username"
                className="w-full py-2 bg-transparent border-b border-black outline-none focus:ouline-none text-sm md:text-base"
              />
              <p className="text-red-500 text-sm">{errors.username?.message}</p>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is Required...",
                  pattern: {
                    value: /^.{6,}$/,
                    message: "Password Must Contain Atleast 6 Characters",
                  },
                })}
                placeholder="Enter your password"
                className="w-full py-2 bg-transparent border-b border-black outline-none focus:ouline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className=" absolute bottom-0 right-0 text-2xl p-1 cursor-pointer"
              >
                {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </span>
            </div>
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <div className="w-full flex flex-col pt-8">
            <button className="w-full bg-primary hover:bg-primary/90 rounded-lg p-4 text-center text-white">
              Signup
            </button>
          </div>
        </form>

        <div className="w-full flex justify-center items-center">
          <p className="text-sm">
            Already a account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-bold underline underline-offset-2 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
