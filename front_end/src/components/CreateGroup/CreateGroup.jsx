import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateGroup = ({ onClose, loadGroupsAndMembers, reloadCalendar }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  // Yup Schema
  const createGroupSchema = yup.object().shape({
    title: yup
      .string()
      .max(48, "Title too long.")
      .required("Title is required."),
    type: yup.string().required("Type is required"),
    description: yup
      .string()
      .nullable()
      .transform((c, o) => (c === "" ? null : o))
      .min(0)
      .max(255, "Description too long."),
  });

  // React UseForm hook
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createGroupSchema),
    defaultValues: {
      title: "",
      type: "public",
      description: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data) => {
    const newData = {
      user_id: sessionStorage.getItem("id"),
      username: sessionStorage.getItem("username"),
      invite_flag: 0,
      group_title: data.title,
      group_desc: data.description,
    };

    await axios
      .post(`${process.env.REACT_APP_API_URL}/group.php`, newData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        // Update all groups & joined members
        loadGroupsAndMembers();
        // Reload calendar
        reloadCalendar();
      })
      .catch((error) => console.error(error));

    // Close create group interface
    onClose();
  };

  // Conditional render variables
  const isPrivateSelected = watch("type") === "private";
  const isPublicSelected = watch("type") === "public";

  const toggleGroupType = (type) => {
    setValue("type", type);
  };

  return (
    <div className="modal-content w-4/5 h-auto bg-slate-200">
      <form
        className="flex flex-col justify-evenly space-y-2"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title Field */}
        <input
          id="Title"
          className="p-1 w-full mt-5 text-lg text-[#660033] bg-white rounded border placeholder-slate-300 focus:[#ffcccc] focus:[#ebbcbc] resize-none"
          placeholder="Title"
          type="text"
          {...register("title")}
        />
        <span className="block text-red-700">{errors.title?.message}</span>
        {/* Type Field */}
        {/* <div className="flex space-x-1 justify-start"> */}
        {/* Public */}
        {/* <button
            type="button"
            className={`h-12 px-6 text-lg rounded-md focus:shadow-outline ${
              isPublicSelected ? "bg-blue-400 text-black" : " text-black"
            }`}
            onClick={() => toggleGroupType("public")}
          >
            Public
          </button> */}

        {/* Private */}
        {/* <button
            type="button"
            className={`h-12 px-6 text-lg rounded-md focus:shadow-outline ${
              isPrivateSelected ? "bg-blue-400 text-black" : " text-black"
            }`}
            onClick={() => toggleGroupType("private")}
          >
            Private
          </button>
          <span className="block text-red-700">{errors.type?.message}</span> */}
        {/* </div> */}

        {/* Description Field */}
        <textarea
          id="Description"
          rows="3"
          className="p-1 w-full text-lg text-[#660033] bg-white rounded border placeholder-slate-300 focus:[#ffcccc] focus:[#ebbcbc] resize-none"
          placeholder="Description"
          type="text"
          {...register("description")}
        />

        {/* Buttons */}
        <div className="">
          {/* Cancel Button*/}
          <button
            className="float-left h-12 px-6 rounded text-white font-bold bg-slate-400 hover:bg-slate-500 display:inline"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          {/* Confirm Button*/}
          <button
            className="float-right h-12 px-6 rounded text-white font-bold bg-slate-400 hover:bg-slate-500 display:inline"
            type="submit"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
