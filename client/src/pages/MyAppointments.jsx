import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendURL, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendURL + "/api/user/verify-razorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
            toast.success(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <>
      <div>
        <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
          My Appointments
        </p>
        <div>
          {appointments.reverse().map((appointment, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            >
              <div>
                <img
                  src={appointment.docData?.image}
                  alt=""
                  className="w-32 bg-indigo-50"
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {appointment.docData?.name}
                </p>
                <p>{appointment.docData?.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{appointment.docData?.address?.line1}</p>
                <p className="text-xs">{appointment.docData?.address?.line2}</p>
                <p className="text-sm mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:{" "}
                  </span>
                  {slotDateFormat(appointment.slotDate)} |{" "}
                  {appointment.slotTime}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                {!appointment.cancelled &&
                  appointment.payment &&
                  !appointment.isCompleted && (
                    <button className="text-sm text-stone-500 bg-indigo-50 text-center sm:min-w-48 py-2 border rounded">
                      Paid
                    </button>
                  )}
                {!appointment.cancelled &&
                  !appointment.payment &&
                  !appointment.isCompleted && (
                    <button
                      onClick={() => appointmentRazorpay(appointment._id)}
                      className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Pay Online
                    </button>
                  )}
                {!appointment.cancelled && !appointment.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(appointment._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    Cancel appointment
                  </button>
                )}
                {appointment.cancelled && !appointment.isCompleted && (
                  <button className="text-sm text-red-500 bg-red-50 text-center sm:min-w-48 py-2 border border-red-500 rounded">
                    Appointment cancelled
                  </button>
                )}
                {appointment.isCompleted && (
                  <button className="text-sm text-green-500 bg-green-50 text-center sm:min-w-48 py-2 border rounded">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyAppointments;
