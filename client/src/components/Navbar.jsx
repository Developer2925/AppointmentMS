import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };
  return (
    <>
      <nav className="flex items-center justify-between text-sm mb-5 border-b border-b-gray-400">
        <img
          onClick={() => navigate("/")}
          src={assets.Hitayu0}
          alt=""
          className="w-96 cursor-pointer"
        />
        <ul className="hidden md:flex items-start gap-5 font-medium">
          <NavLink to="/">
            <li className="py-1 ">HOME</li>
            <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0" />
          </NavLink>
          <NavLink to="/doctors">
            <li className="py-1 ">ALL DOCTORS</li>
            <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0" />
          </NavLink>
          <NavLink to="/about">
            <li className="py-1 ">ABOUT</li>
            <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0" />
          </NavLink>
          <NavLink to="/contact">
            <li className="py-1 ">CONTACT</li>
            <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary opacity-0" />
          </NavLink>
        </ul>
        <div className=" flex items-center gap-4">
          {token && userData ? (
            <div
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="flex gap-1 items-center cursor-pointer group relative"
            >
              <img src={userData.image} alt="" className="w-10 rounded-full" />
              <IoMdArrowDropdown className=" text-lg" />
              <div
                className={`absolute top-0 right-0 pt-16 text-base font-medium text-gray-600 z-20  lg:group-hover:block
                  ${showProfileMenu ? "block lg:hidden" : "hidden"}`}
              >
                <div className=" min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={(e) => navigate("/my-profile")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={(e) => navigate("/my-appointments")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={(e) => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
            >
              Create account
            </button>
          )}
          <BiMenuAltRight
            onClick={() => setShowMenu(true)}
            className=" md:hidden text-3xl"
          />

          {/* --------------- Mobile menu ---------------- */}
          <div
            className={`${
              showMenu ? "fixed w-full" : "w-0 opacity-0"
            } md:hidden absolute right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}
          >
            <div className="flex items-center justify-between px-4">
              <img src={assets.Hitayu0} alt="" className="w-72" />
              <IoClose
                onClick={() => setShowMenu(false)}
                className="text-3xl"
              />
            </div>
            <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
              <NavLink to={"/"} onClick={() => setShowMenu(false)}>
                <p className="px-4 py-2 rounded inline-block">HOME</p>
              </NavLink>
              <NavLink to={"/doctors"} onClick={() => setShowMenu(false)}>
                <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
              </NavLink>
              <NavLink to={"/about"} onClick={() => setShowMenu(false)}>
                <p className="px-4 py-2 rounded inline-block">ABOUT</p>
              </NavLink>
              <NavLink to={"/contact"} onClick={() => setShowMenu(false)}>
                <p className="px-4 py-2 rounded inline-block">CONTACT</p>
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
