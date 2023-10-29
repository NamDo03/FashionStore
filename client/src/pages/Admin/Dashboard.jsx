import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import { HiUser } from "react-icons/hi";
import { BiSolidBox } from "react-icons/bi";
import { publicRequest, userRequest } from "../../requestMethod";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState("");
  const [totalUsers, setTotalUsers] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    const getData = async () => {
      try {
        const resUser = await userRequest.get(`/users`);
        const resProduct = await publicRequest.get(`/products`);
        setTotalProducts(resProduct.data.totalProductsFilter);
        setTotalUsers(resUser.data.totalUsers);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <div className="flex w-full min-h-screen text-gray-900 bg-gray-50">
        <Sidebar />
        <div className="flex-1 py-7 px-10">
          <h1 className="text-2xl font-semibold leading-relaxed text-gray-800">
            DashBoard
          </h1>
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <Loader />
            </div>
          ) : (
            <div className="my-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <HiUser size={30} />
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased text-sm  text-blue-gray-600">
                    Accounts
                  </p>
                  <h4 className="block antialiased tracking-normal text-xl font-semibold text-blue-gray-900">
                    {totalUsers} Users
                  </h4>
                </div>
                <div className="border-t p-2"></div>
              </div>

              <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <BiSolidBox size={30} />
                </div>
                <div className="p-4 text-right">
                  <p className="block antialiased text-sm  text-blue-gray-600">
                    Products
                  </p>
                  <h4 className="block antialiased tracking-normal text-xl font-semibold text-blue-gray-900">
                    {totalProducts}
                  </h4>
                </div>
                <div className="border-t p-2"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
