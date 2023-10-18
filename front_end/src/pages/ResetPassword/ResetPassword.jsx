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
    console.log(data);
    // send POST request to reset password
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
            type="text"
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
            type="text"
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
            type="text"
            className="rounded-md w-full px-1 bg-slate-100 focus:outline focus:shadow-outline"
            id="confirm-new-password"
            placeholder={"Enter your new password"}
            {...register("confirmNewPassword")}
          />
          <span className="block text-red-700">
            {errors.confirmNewPassword?.message}
          </span>
        </div>
        <button
          className="w-full py-1 rounded text-white bg-green-400 font-bold hover:bg-green-500"
          type="submit"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
