import React, { useState } from "react";
import {BiUser} from "react-icons/bi";
import {AiOutlineUnlock} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Convert any special character in string into literal character
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      username,
      password,
    };

    // try {
    //   const response = await axios.post(
    //     `${process.env.REACT_APP_API_URL}/signup.php`,
    //     data
    //   );

    //   if (response.status === 200) {
    //     console.log("Signup successful");
    //     navigate("/editprofile", { state: { email } });
    //   } else {
    //     console.error("Signup failed");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <div className="bg-slate-300">
      <div className="text-white flex flex-col justify-center items-center">
        <h1 className="text-6xl text-black font-bold text-center p-8">
          Sign Up
        </h1>
        <br />
        <div className="flex flex-col items-center">
          <div
            className="bg-slate-800 border border-slate-800 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative"
            style={{ backgroundColor: "lightskyblue" }}
          >
            <form
              className="group"
              onSubmit={handleSubmit}
              autoComplete="off"
              noValidate
            >
              {/* Email */}
              <div className="relative my-1">
                <input
                  type="email"
                  className="block w-96 py-4 px-4 text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder=""
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -x-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Email
                </label>
                <BiUser className="absolute top-4 right-4" />
                <span className="block w-96 invisible peer-invalid:visible">
                  Email should be a valid email address.
                </span>
              </div>
              {/* Username */}
              <div className="relative my-1">
                <input
                  type="text"
                  className="block w-96 py-4 px-4 text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder=""
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  pattern="^[A-Za-z0-9]{3,16}$"
                  required
                />
                <label
                  htmlFor="username"
                  className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -x-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Username
                </label>
                <BiUser className="absolute top-4 right-4" />
                <span className="block w-96 invisible peer-invalid:visible">
                  Username should be 3-16 characters.
                </span>
              </div>
              {/* Password */}
              <div className="relative my-1">
                <input
                  type="password"
                  className="block w-96 py-4 px-4 text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder=""
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -x-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4" />
                <span className="block w-96 invisible peer-invalid:visible">
                  Password should be at least 8 characters, include at least 1
                  letter, 1 number and 1 special character.
                </span>
              </div>
              {/* Confirm Password */}
              <div className="relative my-1">
                <input
                  type="password"
                  className="block w-96 py-4 px-4 text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer"
                  placeholder=""
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  pattern={escapeRegExp(password)}
                  required
                />
                <label
                  htmlFor="confirm-password"
                  className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -x-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4" />
                <span className="block w-96 invisible peer-invalid:visible">
                  Confirm password should match your password.
                </span>
              </div>
              {/* Button */}
              <button
                className="w-full mb-4 text-[25px] mt-6 rounded-full bg-yellow-500 text-black font-bold hover:bg-yellow-600 hover:text-white py-2 transition-colors duration-300"
                type="submit"
              >
                Sign In
              </button>
            </form>
          </div>
          {/* Login Link */}
          <div className="p-8 mt-5">
            <span className="m-12">
              <Link className="text-blue-500 text-3xl font-bold" to="/login">
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