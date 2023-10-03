import React from "react";
import logo from "@/assets/images/logo.svg";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-3 my-3  lg:my-3">
      <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <Link
          to={{
            pathname: "/",
          }}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img className="w-200 h-200 mr-2" src={logo} alt="logo" />
        </Link>
      </span>
    </div>
  );
};

export default Logo;
