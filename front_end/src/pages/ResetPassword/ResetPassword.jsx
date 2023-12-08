import { React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ResetPassword = () => {
  const navigate = useNavigate();

  // Yup Schema
  const resetPasswordSchema = yup.object().shape({
    currentPassword: yup.string().required("Password is required."),
    newPassword: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password should be at least 8 characters, include at least 1 letter, 1 number, and 1 special character."
      )
      .required("New Password is required."),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), "null"], "Passwords must match.")
      .required("Confirm Password is required."),
  });

  // useForm hook
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data) => {
    const resetPasswordData = {
      id: parseInt(sessionStorage.getItem("id")),
      password: data.currentPassword,
      newPassword: data.newPassword,
      confirmnewPassword: data.confirmNewPassword,
    };
    console.log(resetPasswordData);
    // send POST request to reset password
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/passwordreset.php`,
        resetPasswordData,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/manageaccount");
      })
      .catch((error) => {
        // console.error(error);
        console.error(error.response.data);
        if (error.response.data === "Incorrect Password") {
          setError("currentPassword", {
            type: "Wrong Password",
            message: "Wrong Password.",
          });
        }
      });
  };

  const handleCancel = () => {
    // TODO: Should confirm if the user really want to return to previous page
    navigate("/manageaccount");
  };

  return (
    <div className="flex items-center justify-center flex-col bg-slate-300">
      <h1 className="text-4xl font-extrabold mb-5">Reset Password</h1>
      <form
        className="bg-slate-400/30 p-8 rounded-lg flex flex-col w-72"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Current Password */}
        <div className="mb-4">
          <label className="" htmlFor="current-password">
            Current Password:
          </label>
          <input
            type="password"
            className="rounded-md w-full px-1 bg-slate-100 focus:outline focus:shadow-outline"
            id="current-password"
            placeholder={"Enter your current password"}
            {...register("currentPassword")}
          />
          <span className="block text-red-700">
            {errors.currentPassword?.message}
          </span>
        </div>
        {/* New Password */}
        <div className="mb-4">
          <label className="" htmlFor="new-password">
            New Password:
          </label>
          <input
            type="password"
            className="rounded-md w-full px-1 bg-slate-100 focus:outline focus:shadow-outline"
            id="new-password"
            placeholder={"Enter your new password"}
            {...register("newPassword")}
          />
          <span className="block text-red-700">
            {errors.newPassword?.message}
          </span>
        </div>
        {/* Confirm New Password */}
        <div className="mb-4">
          <label className="" htmlFor="confirm-new-password">
            Confirm New Password:
          </label>
          <input
            type="password"
            className="rounded-md w-full px-1 bg-slate-100 focus:outline focus:shadow-outline"
            id="confirm-new-password"
            placeholder={"Enter your new password"}
            {...register("confirmNewPassword")}
          />
          <span className="block text-red-700">
            {errors.confirmNewPassword?.message}
          </span>
        </div>
        {/* Buttons */}
        <div className="flex flex-col space-y-4">
          <button
            className="w-full py-1 rounded text-white bg-green-400 font-bold hover:bg-green-500"
            type="submit"
          >
            Change Password
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
};

export default ResetPassword;
