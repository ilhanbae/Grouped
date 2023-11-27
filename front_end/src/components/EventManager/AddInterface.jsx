import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { MapPinIcon } from '@heroicons/react/24/outline';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const AddInterface = ({
  onClose,
  onDelete,
  onSave,
  selectedEvent,
  fromCalendar,
}) => {
  // Yup Schema
  const addInterfaceSchema = yup.object().shape({
    title: yup
      .string()
      .max(32, "Title too long.")
      .required("Title is required."),
    type: yup.string().required("Type is required."),
    start: yup.date().required("Start Time is required."),
    end: yup
      .date()
      .min(yup.ref("start"), "End time must be later than the start time.")
      .required("End Time is required."),
    location: yup.string().min(0).max(50, "Location too long."),
    description: yup.string().min(0).max(500, "Description too long."),
  });

  // useForm hook
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addInterfaceSchema),
    defaultValues: {
      title: selectedEvent?.title,
      start: moment(selectedEvent.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(selectedEvent.end).format("YYYY-MM-DDTHH:mm"),
      description: selectedEvent.descrip,
      location: selectedEvent.location,
      type: fromCalendar === "individual" ? "self" : "group",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  // This hook allows user to select other time slots without closing the modal.
  // This might not be something that we wanted, should we prevent interactions
  // with other components when the modal is open?
  useEffect(() => {
    if (selectedEvent) {
      setValue("title", selectedEvent.title);
      setValue("start", moment(selectedEvent.start).format("YYYY-MM-DDTHH:mm"));
      setValue("end", moment(selectedEvent.end).format("YYYY-MM-DDTHH:mm"));
      setValue("description", selectedEvent.descrip);
      setValue("location", selectedEvent.location);
    }
  }, [selectedEvent]);

  // Conditional render variables
  const haveDelete =
    getValues("title") != null ? getValues("title") !== "" : false;
  const isSelfSelected = watch("type") === "self";
  const isGroupSelected = watch("type") === "group";

  const toggleEventType = (type) => {
    setValue("type", type);
  };

  // Triggered by submit button inside the form
  // Will only trigger if the validation passes yup schema
  const onSubmit = async (data) => {
    const event = {
      title: data.title,
      start: moment(data.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(data.end).format("YYYY-MM-DDTHH:mm"),
      location: data.location,
      description: data.description,
    };
    // console.log(event);
    onSave(event);
    onClose();
  };

  return (
    <div className="modal-content w-fit h-fit bg-[#e5e7eb]">
      <form
        className="bg-[#e5e7eb] flex flex-col"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <div>
          <input
            className="px-1 h-10 m-2 text-2xl bg-white"
            type="text"
            placeholder="Event Title"
            {...register("title")}
          />
          <span className="block text-red-700">{errors.title?.message}</span>
        </div>
        {/* Type */}
        <div className="flex">
          <button
            id="Self"
            className={`h-12 px-6 m-2 text-lg rounded-lg focus:shadow-outline ${
              isSelfSelected ? "bg-cyan-200 text-black" : "text-black"
            }`}
            type="button"
            onClick={() => toggleEventType("self")}
          >
            Self
          </button>
          <button
            id="Group"
            className={`h-12 px-6 m-2 text-lg rounded-lg focus:shadow-outline ${
              isGroupSelected ? "bg-cyan-200 text-black" : "text-black"
            }`}
            type="button"
            onClick={() => toggleEventType("group")}
          >
            Group
          </button>
          <span className="block text-red-700">{errors.type?.message}</span>
        </div>
        {/* Start Time */}
        <div className="flex flex-col space-y-2">
          <span className="text-lg">
            <span>Start Time: </span>
            <input
              className="text-lg bg-[#e5e7eb] bg-white"
              type="datetime-local"
              {...register("start")}
            />
          </span>
          {/* End Time */}
          <span className="text-lg">
            <span>End Time: </span>
            <input
              className="text-lg bg-[#e5e7eb] bg-white"
              type="datetime-local"
              {...register("end")}
            />
          </span>
          <span className="block text-red-700">{errors.end?.message}</span>
        </div>
        {/* Location */}
        <div className="location-container flex items-center py-2">
          <input
            className="px-1 text-lg bg-[#e5e7eb] bg-white"
            type="text"
            placeholder="Location"
            {...register("location")}
          />
          <MapPinIcon className="location-icon h-6 w-6" />
          <span className="block text-red-700">{errors.location?.message}</span>
        </div>
        {/* Description */}
        <div>
          <textarea
            id="description"
            rows="4"
            className="px-1 block py-2 w-full text-sm text-[#020617] bg-[#0ea5e9] rounded-lg border focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Description"
            {...register("description")}
          />
          <span className="block text-red-700">
            {errors.description?.message}
          </span>
        </div>
        {/* Buttons */}
        <div className="flex justify-end mt-4">
          <div className="flex flex-wrap">
            {/* Confirm Button */}
            <button
              className="h-12 m-2 px-6 bg-gray-600 text-white"
              type="submit"
            >
              Confirm
            </button>
            {/* Cancel Button */}
            <button
              className="h-12 m-2 px-6 bg-gray-600 text-white"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            {/* Delete Button */}
            {haveDelete && (
              <button
                className="h-12 m-2 px-6 bg-red-400 text-white rounded-md hover:bg-red-500"
                type="button"
                onClick={onDelete}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddInterface;
