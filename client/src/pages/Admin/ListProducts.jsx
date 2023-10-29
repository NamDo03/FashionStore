import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Products from "../../components/Admin/Products";

const ListProducts = () => {
  return (
    <div className="flex w-full min-h-screen text-gray-900 bg-gray-50">
      <Sidebar />
      <div className="flex-1 pb-8">
        <Products />
      </div>
    </div>
  );
};

export default ListProducts;
