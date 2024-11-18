import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { aToken, setAToken, backendURL } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendURL + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          console.log("admin: " + data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendURL + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          console.log("doctor: " + data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-primary">{state}</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name=""
              id=""
              required
              className="border border-[#dadada] focus:outline-none w-full p-2 mt-1 rounded"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name=""
              id=""
              required
              className="border border-[#dadada] focus:outline-none w-full p-2 mt-1 rounded"
            />
          </div>
          {state === "Admin" ? (
            <button
              onClick={() => navigate("/admin-dashboard")}
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-md text-base"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => navigate("/doctor-dashboard")}
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-md text-base"
            >
              Login
            </button>
          )}
          {/* <button
            type="submit"
            className="bg-primary text-white w-full py-2 rounded-md text-base"
          >
            Login
          </button> */}
          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="cursor-pointer text-primary underline"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="cursor-pointer text-primary underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default Login;
