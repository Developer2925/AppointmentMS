import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendURL, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendURL + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendURL + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          // toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <div>
        <form
          onSubmit={onSubmitHandler}
          action=""
          className="min-h-[80vh] flex items-center"
        >
          <div className=" flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
            <p className=" text-2xl font-semibold">
              {state === "Sign Up" ? "Create Account" : "Login"}
            </p>
            <p>
              Please {state === "Sign Up" ? "sign up" : "login"} to book
              appointment
            </p>
            {state === "Sign Up" && (
              <div className="w-full">
                <label htmlFor="">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                  name=""
                  id=""
                  className="focus:outline-none border border-zinc-300 rounded w-full p-2 mt-1"
                />
              </div>
            )}

            <div className="w-full">
              <label htmlFor="">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name=""
                id=""
                className="focus:outline-none border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>
            <div className="w-full">
              <label htmlFor="">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name=""
                id=""
                className="focus:outline-none border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>
            <button
              type="submit"
              className="text-center w-full text-white bg-primary py-2 rounded-md text-base"
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>
            {state === "Sign Up" ? (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-primary underline cursor-pointer"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Create an new account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-primary underline cursor-pointer"
                >
                  click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
