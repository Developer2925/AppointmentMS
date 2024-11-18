import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <>
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Appointments</p>
        <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor Name</p>
            <p>Fee</p>
            <p>Action</p>
          </div>
          {appointments.reverse().map((appointment, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid 
              sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            >
              <p className="max-sm:hidden ">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={appointment.userData.image}
                  alt=""
                  className="w-8 rounded-full"
                />
                <p>{appointment.userData.name}</p>
              </div>
              <p className="max-sm:hidden">
                {calculateAge(appointment.userData.dob)}
              </p>
              <p>
                {slotDateFormat(appointment.slotDate)}, {appointment.slotTime}
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={appointment.docData.image}
                  alt=""
                  className="w-8 rounded-full bg-gray-200"
                />
                <p>{appointment.docData.name}</p>
              </div>
              <p>
                {currency}
                {appointment.docData.fee}
              </p>
              {appointment.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <>
                  {appointment.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(appointment._id)}
                      src={assets.cancel_icon}
                      alt=""
                      className="w-10 cursor-pointer"
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllAppointments;
