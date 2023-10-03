import React from "react";
import { useNavigate } from "react-router-dom";

const PopupRegister: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      id="info-popup"
      className="bg-slate-400 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
    >
      <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow md:p-8">
          <div className="mb-4 text-sm font-light text-gray-500">
            <h3 className="mb-3 text-2xl font-bold text-gray-900">
              Registration successful
            </h3>
            <p>
              Registration successful. Please sign in to view our dashboard.
            </p>
          </div>
          <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
            <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
              <button
                onClick={() => navigate("/")}
                type="button"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupRegister;
