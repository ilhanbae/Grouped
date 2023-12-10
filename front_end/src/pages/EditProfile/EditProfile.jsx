import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  const universityOptionList = [
    "Not Applicable",
    "University at Buffalo",
    "Stanford University",
    "Carnegie Mellon University",
    "Harvard University",
  ];

  // Yup Schema
  const editProfileSchema = yup.object().shape({
    firstname: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid first name.")
      .max(32, "First Name too long."),
    lastname: yup
      .string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid last name.")
      .max(32, "Last Name too long."),
    // .required("Last Name is required."),
    bio: yup.string().max(150, "Bio should not exceed 150 characters."),
    school: yup
      .string()
      .oneOf(universityOptionList, "University must be valid."),
  });

  // useForm hook
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    loadUserInfo();
  }, []);

  // Send GET request to get user info
  const loadUserInfo = async () => {
    setIsLoaded(false);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user.php`, {
        params: {
          email: sessionStorage.getItem("email"),
        },
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response.data);
        setValue(
          "email",
          location.state ? location.state : sessionStorage.getItem("email")
        );
        setValue(
          "firstname",
          response.data.firstName ? response.data.firstName : ""
        );
        setValue(
          "lastname",
          response.data.lastName ? response.data.lastName : ""
        );
        setValue("bio", response.data.bio ? response.data.bio : "");
        setValue(
          "school",
          response.data.school ? response.data.school : "Not Applicable"
        );
      })
      .catch((error) => console.error(error));
    setIsLoaded(true);
  };

  const handleCancel = () => {
    // TODO: Should confirm if the user really want to return to previous page
    if (location.state) {
      // When user came from sign up page
      navigate("/individualCalendar");
    } else {
      // When user came from manage account page
      navigate("/manageaccount");
    }
  };

  const onSubmit = async (data) => {
    // console.log(data);
    // Send POST request to update a user
    await axios
      .post(`${process.env.REACT_APP_API_URL}/manageaccount.php`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        // console.log(response);
        if (location.state) {
          // When user came from sign up page
          navigate("/individualCalendar");
        } else {
          // When user came from manage account page
          navigate("/manageaccount");
        }
      })
      .catch((error) => console.error(error));
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center">Loading...</div>;
  } else {
    return (
      <div className="flex items-center justify-center flex-col bg-slate-300">
        <h1 className="text-4xl font-extrabold mb-5">Edit Profile</h1>
        {/* User Info Form */}
        <form
          className="bg-slate-400/30 p-8 rounded-lg flex flex-col w-72"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          {/* First Name */}
          <div className="mb-4">
            <label className="" htmlFor="firstname">
              First Name:
            </label>
            <input
              className="rounded-md w-full px-1 bg-slate-100 focus:outline focus:shadow-outline"
              id="firstname"
              type="text"
              placeholder={"Enter your first name"}
              {...register("firstname")}
            />
            <span className="block text-red-700">
              {errors.firstname?.message}
            </span>
          </div>
          {/* Last Name */}
          <div className="mb-4">
            <label className="" htmlFor="lastname">
              Last Name:
            </label>
            <input
              className="rounded-md w-full px-1 bg-slate-100 focus:outline focus:shadow-outline"
              id="lastname"
              type="text"
              placeholder={"Enter your last name"}
              {...register("lastname")}
            />
            <span className="block text-red-700">
              {errors.lastname?.message}
            </span>
          </div>
          {/* Bio */}
          <div className="flex flex-col">
            <label className="" htmlFor="bio">
              Bio:
            </label>
            <textarea
              className="rounded-md w-full px-1 bg-slate-100 focus:outline focus:shadow-outline"
              id="bio"
              placeholder={"Enter your bio"}
              {...register("bio")}
              maxLength={150}
            />
            <span className="text-right">{watch("bio").length}/150</span>
            <span className="block text-red-700">{errors.bio?.message}</span>
          </div>
          {/* School */}
          <div className="mb-4 flex flex-col">
            <label className="" htmlFor="school">
              School:
            </label>
            <select
              className="rounded-md w-full px-1 bg-slate-100 focus:outline focus:shadow-outline"
              {...register("school")}
            >
              {universityOptionList.map((university, index) => (
                <option key={index} value={university}>
                  {university}
                </option>
              ))}
            </select>
            <span className="block text-red-700">{errors.school?.message}</span>
          </div>
          {/* Buttons */}
          <div className="flex flex-col space-y-4 ">
            <button
              className="w-full py-1 rounded text-white bg-green-400 font-bold hover:bg-green-500"
              type="submit"
            >
              Submit Changes
            </button>
            <button
              className="w-full py-1 rounded text-white bg-red-400 font-bold hover:bg-red-500"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default EditProfile;