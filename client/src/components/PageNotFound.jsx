import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="font-mono text-3xl">404 Page Not Found</h1>
      <p>
        The page you requested does not exist.{" "}
        <u
          onClick={() => navigate("/")}
          className="cursor-pointer hover:text-hover"
        >
          Continue shopping
        </u>
      </p>
    </div>
  );
};

export default PageNotFound;
