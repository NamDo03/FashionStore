import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { PiPencilSimpleLineFill, PiTrashSimpleDuotone } from "react-icons/pi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { toast } from "react-toastify";
import { userRequest } from "../../requestMethod";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader";

const Users = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalUsers / 6);

  const currentPageFromUrl =
    parseInt(new URLSearchParams(window.location.search).get("page")) || 1;

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    const getUsers = async () => {
      try {
        const res = await userRequest.get(`/users?page=${currentPageFromUrl}`);
        setTotalUsers(res.data.totalUsers);
        setUsers(res.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [currentPageFromUrl]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`${
          i === currentPageFromUrl
            ? "bg-primary text-white"
            : "bg-white text-primary hover:bg-gray-100"
        } border border-gray-300 px-4 py-2 text-base font-semibold`}
      >
        {i}
      </button>
    );
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const queryParams = new URLSearchParams(location.search);
      queryParams.set("page", newPage);

      const newUrl = `/admin/users?${queryParams.toString()}`;
      navigate(newUrl);
      window.scrollTo(0, 0);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await userRequest.delete("/users/" + userId);
      toast.success("Deleted User Successful.");
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      toast.error("Deleted User Failed.");
      console.log(err);
    }
  };

  const Permission = async (userId, isAdmin) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, isAdmin } : user
      )
    );
    try {
      await userRequest.put(`/users/${userId}`, { isAdmin });
      toast.success("User permission updated successfully.");
    } catch (err) {
      toast.error("Failed to update user permission.");
      console.error(err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between py-7 px-10">
        <div className="">
          <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">
            Users
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Let's grow to your business! Manage your users here
          </p>
        </div>
        <button className="inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-primary rounded-lg hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1">
          <AiOutlinePlus className="w-6 h-6 fill-current" />
          <span
            onClick={() => navigate("/admin/adduser")}
            className="text-sm font-semibold tracking-wide"
          >
            Create User
          </span>
        </button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <table className="w-full border-b border-gray-200">
            <thead className="text-center">
              <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                <td className="pl-10">Email</td>
                <td className="py-4 px-4 text-center">User Name</td>
                <td className="py-4 px-4 text-center">Permission</td>
                <td className="py-4 px-4 text-center">
                  <FaFilter />
                </td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 transition-colors group"
                >
                  <td className="flex gap-x-4 items-center py-4 pl-10">
                    {user.email}
                  </td>
                  <td className="font-medium text-center">{user.username}</td>

                  <td className="font-medium text-center">
                    <div className="flex items-center justify-center gap-10">
                      <div className="flex items-center">
                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                          <input
                            aria-labelledby="labelAdmin"
                            type="radio"
                            value="Admin"
                            checked={user.isAdmin}
                            onChange={() => Permission(user._id, true)}
                            readOnly
                            className="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                          />
                          <div className="check-icon hidden border-4 border-indigo-600 rounded-full w-full h-full z-1"></div>
                        </div>
                        <label
                          id="lablabelAdminel1"
                          className="ml-2 text-sm leading-4 font-normal text-gray-800"
                        >
                          Admin
                        </label>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
                          <input
                            aria-labelledby="labelMember"
                            type="radio"
                            value="Member"
                            checked={!user.isAdmin}
                            onChange={() => Permission(user._id, false)}
                            readOnly
                            className="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
                          />
                          <div className="check-icon hidden border-4 border-indigo-600 rounded-full w-full h-full z-1"></div>
                        </div>
                        <label
                          id="labelMember"
                          className="ml-2 text-sm leading-4 font-normal text-gray-800"
                        >
                          Member
                        </label>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="inline-block w-20 group-hover:hidden">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                    <div className="hidden group-hover:flex group-hover:w-20 group-hover:items-center group-hover:text-gray-500 group-hover:gap-x-2">
                      <button className="p-2 hover:rounded-md hover:bg-gray-200">
                        <PiPencilSimpleLineFill
                          onClick={() =>
                            navigate("/admin/edituser/" + user._id)
                          }
                          className="w-6 h-6 fill-current"
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 hover:rounded-md hover:bg-gray-200"
                      >
                        <PiTrashSimpleDuotone className="w-6 h-6 fill-current" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages >= 2 && (
            <div className="mt-20 flex justify-center items-center isolate ">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="border border-gray-300 px-2 py-2 text-2xl text-gray-400 hover:text-primary rounded-l-md"
              >
                <FiChevronLeft />
              </button>
              {pageButtons}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="border border-gray-300 px-2 py-2 text-2xl text-gray-400 hover:text-primary rounded-r-md"
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Users;
