import React, { useEffect, useState } from "react";
import { ILoginResponse } from "@/api/api.type";
import { useLocalStorage } from "@/api/layer/useLocaleStorage";
import { Link } from "react-router-dom";

const DisplayUserInfo: React.FC = () => {
  // Initialize the useLocalStorage hook to get and remove user data
  const { getUser, removeToken } = useLocalStorage();

  // Initialize state to store user data
  const [userData, setUserData] = useState<ILoginResponse | null>(null);

  useEffect(() => {
    // Retrieve user data from local storage when the component mounts
    const storedUserData = getUser();
    if (storedUserData) {
      const data: ILoginResponse = JSON.parse(storedUserData);
      setUserData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      // Remove the user token and reload the page on sign out
      removeToken();
      window.location.reload();
    }
  };

  return (
    <>
      <div className="w-full p-4 lg:w-3/5 mx-auto bg-white border border-gray-200 rounded-lg shadow">
        {userData ? (
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"
              alt={userData.lastName}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              {userData.lastName} {userData.firstName}
            </h5>
            <span className="text-sm text-gray-500 ">{userData.email}</span>
            <div className="flex mt-4 space-x-3 md:mt-6">
              {/* Link to the "Update Info" page */}
              <Link
                to={{
                  pathname: "/user-info",
                }}
              >
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                  Update info
                </button>
              </Link>

              {/* Sign out button */}
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div>No data found</div>
        )}
      </div>
    </>
  );
};

export default DisplayUserInfo;
