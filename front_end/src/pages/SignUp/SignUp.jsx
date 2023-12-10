import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";

const SignUp = () => {
  const navigate = useNavigate();

  // Send GET request to get a user by email and username
  const checkUniqueUser = async (user) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user.php`,
        {
          params: {
            email: user?.email,
            username: user?.username,
          },
        }
      );
      if (response.status === 200) {
        if (Object.keys(response.data).length > 0) {
          console.log("Check Unique Email or Username: duplicate");
          return false;
        } else {
          console.log("Check Unique Email or Username: not duplicate");
          return true;
        }
      }
    } catch (error) {
      console.error("Get User API Error:", error);
    }
  };

  // Yup Schema
  const signUpSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email should be a valid email address")
      .required("Email is required.")
      .test(
        "Unique Email",
        "Email address already in use.",
        async (value) => await checkUniqueUser({ email: value })
      ),
    username: yup
      .string()
      .matches(
        /^[A-Za-z0-9]{3,16}$/,
        "Username should be 3-16 alphanumeric characters."
      )
      .test(
        "Unique Username",
        "Username already in use.",
        async (value) => await checkUniqueUser({ username: value })
      )
      .required("Username is required."),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password should be at least 8 characters, include at least 1 letter, 1 number, and 1 special character."
      )
      .required("Password is required."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), "null"], "Passwords must match.")
      .required("Confirm Password is required."),
  });

  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data) => {
    // Send POST request to register a user
    await axios
      .post(`${process.env.REACT_APP_API_URL}/signup.php`, data)
      .then((response) => {
        console.log("Signup successful!");
      })
      .catch((error) => {
        console.log(error);
      });

    // Send POST request to login a user
    await axios
      .post(`${process.env.REACT_APP_API_URL}/login.php`, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log("Login successful!");
        // Update session storage
        sessionStorage.setItem("id", response.data.id); // user's id
        sessionStorage.setItem("username", response.data.username); // user's username
        sessionStorage.setItem("email", response.data.email); // user's email
        sessionStorage.setItem("token", response.data.token); // user's token
        navigate("/editprofile", { state: response.data.email });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-slate-300">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-6xl text-black font-bold text-center p-8">
          Sign Up
        </h1>
        <br />
        <div className="flex flex-col items-center">
          <div
            className="bg-slate-800 border border-slate-800 rounded-md p-8 shadow-lg"
            style={{ backgroundColor: "lightskyblue" }}
          >
            <form
              className="group"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
            >
              {/* Email */}
              <div className="relative my-4">
                <input
                  type="email"
                  className="block w-80 py-4 px-4 text-lg text-black bg-transparent border-0 border-b-2 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  id="email"
                  placeholder=""
                  {...register("email")}
                />
                <label
                  htmlFor="email"
                  className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -x-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Email
                </label>
                <BiUser className="absolute top-4 right-4" />
                <span className="block w-80 text-red-700">
                  {errors.email?.message}
                </span>
              </div>
              {/* Username */}
              <div className="relative my-4">
                <input
                  type="text"
                  className="block w-80 py-4 px-4 text-lg text-black bg-transparent border-0 border-b-2 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  id="username"
                  placeholder=""
                  {...register("username")}
                />
                <label
                  htmlFor="username"
                  className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -x-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Username
                </label>
                <BiUser className="absolute top-4 right-4" />
                <span className="block w-80 text-red-700">
                  {errors.username?.message}
                </span>
              </div>
              {/* Password */}
              <div className="relative my-4">
                <input
                  type="password"
                  className="block w-80 py-4 px-4 text-lg text-black bg-transparent border-0 border-b-2 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  id="password"
                  placeholder=""
                  {...register("password")}
                />
                <label
                  htmlFor="password"
                  className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -x-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4" />
                <span className="block w-80 text-red-700">
                  {errors.password?.message}
                </span>
              </div>
              {/* Confirm Password */}
              <div className="relative my-4">
                <input
                  type="password"
                  className="block w-80 py-4 px-4 text-lg text-black bg-transparent border-0 border-b-2 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  id="confirm-password"
                  placeholder=""
                  {...register("confirmPassword")}
                />
                <label
                  htmlFor="confirm-password"
                  className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -x-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4" />
                <span className="block w-80 text-red-700">
                  {errors.confirmPassword?.message}
                </span>
              </div>
              {/* Button */}
              <button
                className="w-full mb-4 text-[25px] mt-6 rounded-full bg-yellow-500 text-black font-bold hover:bg-yellow-600 hover:text-white py-2 transition-colors duration-300"
                type="submit"
              >
                Create Account
              </button>
            </form>
          </div>
          {/* Login Link */}
          <div>
            <span className="m-12">
              <Link className="text-blue-500 text-3xl font-bold flex" to="/login">
                Have an Account?
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
