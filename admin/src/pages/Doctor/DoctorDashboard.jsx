import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  return (
    dashData && (
      <>
        <div className="m-5">
          <div className="flex flex-wrap gap-3">
            <div
              className="flex items-center gap-2 bg-white p-4 min-w-52 rounded 
          border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-500"
            >
              <img src={assets.earning_icon} alt="" className="w-14" />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {currency} {dashData.earnings}
                </p>
                <p className="text-gray-400">Earnings</p>
              </div>
            </div>
            <div
              className="flex items-center gap-2 bg-white p-4 min-w-52 rounded 
          border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-500"
            >
              <img src={assets.appointments_icon} alt="" className="w-14" />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {dashData.appointments}
                </p>
                <p className="text-gray-400">Appointments</p>
              </div>
            </div>
            <div
              className="flex items-center gap-2 bg-white p-4 min-w-52 rounded 
          border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-500"
            >
              <img src={assets.patients_icon} alt="" className="w-14" />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {dashData.patients}
                </p>
                <p className="text-gray-400">Patients</p>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <div className="flex items-center gap-2.5 p-4 mt-10 rounded-t border">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold">Latest Bookings</p>
            </div>
            <div className="pt-4 border border-t-0">
              {dashData.latestAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                >
                  <img
                    src={appointment.userData.image}
                    alt=""
                    className="rounded-full w-10"
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {appointment.userData.name}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormat(appointment.slotDate)},{" "}
                      {appointment.slotTime}
                    </p>
                  </div>
                  {appointment.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
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
        </div>
      </>
    )
  );
};

export default DoctorDashboard;
