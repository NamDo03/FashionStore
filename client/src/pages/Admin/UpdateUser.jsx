import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethod";

const UpdateUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.pathname.split("/")[3];

  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get("/users/find/" + userId);
        setUsername(res.data.username);
        setIsAdmin(res.data.isAdmin);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [userId]);

  const handleRadioChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Admin") {
      setIsAdmin(true);
    } else if (selectedValue === "Member") {
      setIsAdmin(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const editUser = async () => {
    const editUser = {
      username,
      isAdmin,
    };
    console.log(editUser);
    try {
      await userRequest.put("/users/" + userId, editUser);
      navigate("/admin/users");
      toast.success("Update User Successfully.");
    } catch (error) {
      toast.error("Update Failed User.");
      console.error("Error Update User:", error);
    }
  };
  return (
    <div className="flex w-full min-h-screen text-gray-900 bg-gray-50">
      <Sidebar />
      <div className="flex-1 pb-8 bg-[#f1f5f9] py-16 px-20">
        <div className="rounded-sm border border-stroke bg-white shadow-default">
          <div className="border-b border-stroke py-4 px-6.5">
            <h3 className="font-medium text-black uppercase text-center">
              Edit Product
            </h3>
          </div>
          <form onSubmit={handleSubmit(editUser)}>
            <div className="p-7">
              <div className="mb-5">
                <label className="mb-3 block text-black">Username</label>
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your Username"
                  className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default ${
                    errors.username ? "border-red-400" : "border-stroke"
                  }`}
                />
                <p className="text-red-500 text-sm mt-3">
                  {errors.username?.message}
                </p>
              </div>
              <div className="mb-7">
                <label className="mb-3 block text-black">Permission</label>
                <div className="flex items-center justify-start gap-14">
                  <div className="flex items-center">
                    <div className="bg-white rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                      <input
                        aria-labelledby="labelAdmin"
                        type="radio"
                        value="Admin"
                        checked={isAdmin}
                        onChange={handleRadioChange}
                        className="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                      />
                      <div className="check-icon hidden border-[6px] border-indigo-600 rounded-full w-full h-full z-1"></div>
                    </div>
                    <label
                      id="labelAdmin"
                      className="ml-2 text-sm leading-4 font-normal text-gray-800"
                    >
                      Admin
                    </label>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white rounded-full w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                      <input
                        aria-labelledby="labelMember"
                        type="radio"
                        value="Member"
                        checked={!isAdmin}
                        onChange={handleRadioChange}
                        className="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                      />
                      <div className="check-icon hidden border-[6px] border-indigo-600 rounded-full w-full h-full z-1"></div>
                    </div>
                    <label
                      id="labelMember"
                      className="ml-2 text-sm leading-4 font-normal text-gray-800"
                    >
                      Member
                    </label>
                  </div>
                </div>
              </div>

              <button className="flex w-full justify-center rounded bg-primary text-white p-3 font-medium hover:bg-primary/80">
                Edit User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
