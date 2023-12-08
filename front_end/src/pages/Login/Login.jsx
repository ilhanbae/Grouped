import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const navigate = useNavigate();

  // Yup Schema
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email should be a valid email address")
      .required("Email is required."),
    password: yup.string().required("Password is required."),
  });

  // useForm hook
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data) => {
    // Send POST request to login a user
    await axios
      .post(`${process.env.REACT_APP_API_URL}/login.php`, data)
      .then((response) => {
        console.log("Login successful!");
        // Update session storage
        sessionStorage.setItem("id", response.data.id); // user's id
        sessionStorage.setItem("username", response.data.username); // user's username
        sessionStorage.setItem("email", response.data.email); // user's email
        sessionStorage.setItem("token", response.data.token); // user's token
        navigate("/individualCalendar");
      })
      .catch((error) => {
        console.error(error);
        setError("email", {
          type: "Email and password combination",
          message: "Incorrect email address or password.",
        });
        setError("password", {
          type: "Email and password combination",
          message: "Incorrect email address or password.",
        });
      });
  };

  return (
    <div className="bg-slate-300 flex flex-col">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl text-black font-bold text-center p-8">
          Login to Your Account
        </h1>
        <br />
        <div className="flex flex-col items-center">
          <div
            className="bg-slate-800 border border-slate-800 rounded-md p-8 shadow-lg"
            style={{ backgroundColor: "lightskyblue" }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
            >
              {/* Email */}
              <div className="relative my-4">
                <input
                  type="email"
                  className="block w-80 py-4 px-4 text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder=""
                  {...register("email")}
                />
                <label
                  htmlFor=""
                  className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -x-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Email
                </label>
                <BiUser className="absolute top-4 right-4" />
                <span className="block w-80 text-red-700">
                  {errors.email?.message}
                </span>
              </div>
              {/* Password */}
              <div className="relative my-4">
                <input
                  type="password"
                  className="block w-80 py-4 px-4 text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder=""
                  {...register("password")}
                />
                <label
                  htmlFor=""
                  className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -x-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4" />
                <span className="block w-80 text-red-700">
                  {errors.password?.message}
                </span>
              </div>
              <button
                className="w-full mb-4 text-[25px] mt-6 rounded-full bg-yellow-500 text-black font-bold hover:bg-yellow-600 hover:text-white py-2 transition-colors duration-300"
                type="submit"
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="p-8" style={{ marginTop: "20px" }}>
            <span>
              <Link
                className="text-blue-500 text-2xl font-bold flex"
                to="/signup"
              >
                Don't have an Account?
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
