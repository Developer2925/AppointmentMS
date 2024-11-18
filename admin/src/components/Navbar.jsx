import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");

    // Admin login
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");

    // Doctor login
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
        <div className="flex items-center gap-3 text-xs">
          <img src={assets.Hitayu0} alt="" className="w-96 cursor-pointer" />
          <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
            {aToken ? "Admin" : "Doctor"}
          </p>
        </div>
        <button
          onClick={logout}
          className="bg-primary text-white text-sm px-10 py-2 rounded-full"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
