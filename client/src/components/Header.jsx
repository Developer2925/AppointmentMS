import React from "react";
import { assets } from "../assets/assets";
import { FaArrowRight } from "react-icons/fa6";

const Header = () => {
  return (
    <>
      <div className="flex flex-col gap-60 md:flex-row md:gap-0 flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
        {/* Left Side */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
          <h1 className=" text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
            Book Appointment <br />
            With Trusted Doctors
          </h1>
          <div className=" flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
            <img src={assets.group_profiles} alt="" className="w-28" />
            <p className="tracking-tight">
              Simply browse through our extensive list of trusted doctors,{" "}
              <br className="hidden sm:block" />
              schedule your appointment hassle-free.
            </p>
          </div>
          <a
            href="#speciality"
            className="bg-white flex items-center gap-2 px-8 py-3 rounded-full 
            text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          >
            Book appointment <FaArrowRight />
          </a>
        </div>
        {/* Right Side */}
        <div className="md:w-1/2 relative">
          <img
            src={assets.header_img}
            alt=""
            className="w-full absolute bottom-0 h-auto rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
