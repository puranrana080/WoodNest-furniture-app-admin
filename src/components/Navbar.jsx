import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    navigate("/");
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 pt-5 text-center text-[#cd3535]">
        WoodNest Admin Dashboard
      </h1>
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        {/* Left Menu */}
        <div className="flex space-x-6">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `font-semibold hover:text-blue-500 ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700"
              }`
            }
          >
            Manage Products
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `font-semibold hover:text-blue-500 ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700"
              }`
            }
          >
            Manage Orders
          </NavLink>
        </div>

        {/* Right Logout */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
