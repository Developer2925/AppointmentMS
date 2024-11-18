import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <>
      <div>
        <div>
          <h1 className=" text-center text-2xl pt-10 text-gray-500">
            ABOUT <span className="text-gray-700 font-medium">US</span>
          </h1>
        </div>
        <div className="my-10 flex flex-col md:flex-row gap-12">
          <img
            src={assets.about_image}
            alt=""
            className="w-full md:max-w-[360px]"
          />
          <div className=" capitalize flex flex-col justify-center gap-9 md:w-3/4 text-[16px] font-light text-gray-600">
            <p>
              Welcome to Hitayu, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At Hitayu, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </p>
            <p>
              Hitayu is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you're booking your first appointment or
              managing ongoing care, Hitayu is here to support you every
              step of the way.
            </p>
            <b className=" text-gray-800 font-semibold">Our Vision</b>
            <p>
              Our vision at Hitayu is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
        <div className="pt-10">
          <h1 className="text-2xl text-gray-500">
            WHY <span className="text-gray-700 font-medium">CHOOSE US</span>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row mt-10 mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b className="uppercase">Efficiency:</b>
            <p className="capitalize">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b className="uppercase">Convenience:</b>
            <p className="capitalize">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b className="uppercase">Personalization:</b>
            <p className="capitalize">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
