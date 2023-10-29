import React from "react";
import Users from "../../components/Admin/Users";
import Sidebar from "../../components/Admin/Sidebar";

const ListUsers = () => {
  return (
    <div className="flex w-full min-h-screen text-gray-900 bg-gray-50">
      <Sidebar />
      <div className="flex-1 pb-8">
        <Users />
      </div>
    </div>
  );
};

export default ListUsers;
