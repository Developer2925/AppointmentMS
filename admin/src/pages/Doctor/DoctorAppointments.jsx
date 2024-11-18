import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);
  return (
    <>
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointments</p>
        <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
          <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fee</p>
            <p>Action</p>
          </div>
          {appointments.reverse().map((appointment, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base 
              sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 
              py-3 px-6 border-b hover:bg-gray-50"
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={appointment.userData.image}
                  alt=""
                  className="w-8 rounded-full"
                />
                <p>{appointment.userData.name}</p>
              </div>
              <div>
                <p className="text-xs inline border border-primary px-2 rounded-full">
                  {appointment.payment ? "ONLINE" : "CASH"}
                </p>
              </div>
              <p className="max-sm:hidden">
                {calculateAge(appointment.userData.dob)}
              </p>
              <p>
                {slotDateFormat(appointment.slotDate)} , {appointment.slotTime}
              </p>
              <p>
                {currency}
                {appointment.amount}
              </p>
              {appointment.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : appointment.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex">
                  <img
                    onClick={() => cancelAppointment(appointment._id)}
                    src={assets.cancel_icon}
                    alt=""
                    className="w-10 cursor-pointer"
                  />
                  <img
                    onClick={() => completeAppointment(appointment._id)}
                    src={assets.tick_icon}
                    alt=""
                    className="w-10 cursor-pointer"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DoctorAppointments;