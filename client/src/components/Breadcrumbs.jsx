import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";

const Breadcrumbs = ({ breadCrumbs }) => {
  return (
    <ul className="text-center flex items-center text-base gap-3 text-text">
      <li className="breadCrumb">
        <Link to="/" className="flex flex-row items-center gap-2 crumb">
          <AiFillHome />
          Home
        </Link>
        <FiChevronRight size={24} />
      </li>
      {breadCrumbs?.map((breadCrumb, index) => (
        <li key={index} className="breadCrumb">
          <Link to={breadCrumb.url} className="crumb">
            {breadCrumb.name}
          </Link>
          {index < breadCrumbs.length - 1 && <FiChevronRight size={24} />}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
