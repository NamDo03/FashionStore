import React, { useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { publicRequest } from "../../requestMethod";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const AddUser = () => {
  const [showPassword, setShowPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const createUser = async (data) => {
    try {
      const res = await publicRequest.post("/auth/signup", data);
      res.data && window.location.replace("/admin/users");
      toast.success("Sign Up Successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Sign Up Failed.");
    }
  };
  return (
    <div className="flex w-full min-h-screen text-gray-900 bg-gray-50">
      <Sidebar />
      <div className="flex-1 pb-8 bg-[#f1f5f9] py-16 px-20">
        <div className="rounded-sm border border-stroke bg-white shadow-default">
          <div className="border-b border-stroke py-4 px-6.5">
            <h3 className="font-medium text-black uppercase text-center">
              Add New User
            </h3>
          </div>
          <form onSubmit={handleSubmit(createUser)}>
            <div className="p-7">
              <div className="mb-5">
                <label className="mb-3 block text-black">
                  Email <span className="text-red-500">*</span>
                </label>
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
                  placeholder="Enter your Email"
                  className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default ${
                    errors.email ? "border-red-400" : "border-stroke"
                  }`}
                />
                <p className="text-red-500 text-sm mt-3">
                  {errors.email?.message}
                </p>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-black">
                  Username <span className="text-red-500">*</span>
                </label>
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
                  placeholder="Enter your Username"
                  className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default ${
                    errors.username ? "border-red-400" : "border-stroke"
                  }`}
                />
                <p className="text-red-500 text-sm mt-3">
                  {errors.username?.message}
                </p>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-black">
                  Password <span className="text-red-500">*</span>
                </label>
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
                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default ${
                      errors.password ? "border-red-400" : "border-stroke"
                    }`}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className=" absolute top-1/2 right-2 -translate-y-1/2 text-2xl p-1 cursor-pointer"
                  >
                    {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                  </span>
                </div>

                <p className="text-red-500 text-sm mt-3">
                  {errors.password?.message}
                </p>
              </div>

              <button className="flex w-full justify-center rounded bg-primary text-white p-3 font-medium hover:bg-primary/80">
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
