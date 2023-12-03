import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { MapPinIcon } from '@heroicons/react/24/outline';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getColorById } from "../../utils/getEventProp";

const AddInterface = ({
  onClose,
  onDelete,
  onSave,
  selectedEvent,
  fromCalendar,
  groups,
}) => {
  // Yup Schema
  const addInterfaceSchema = yup.object().shape({
    title: yup
      .string()
      .max(32, "Title too long.")
      .required("Title is required."),
    type: yup.string().required("Type is required."),
    groupId: yup
      .number()
      .nullable()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .when("type", {
        is: "group",
        then: (schema) =>
          schema.required("Please select a group.").oneOf(
            groups.map((group) => group.id),
            "The specified group does not exist."
          ),
        otherwise: (schema) => schema.optional(),
      }),
    start: yup.date().required("Start Time is required."),
    end: yup
      .date()
      .min(yup.ref("start"), "End time must be later than the start time.")
      .required("End Time is required."),
    location: yup
      .string()
      .nullable()
      .transform((c, o) => (c === "" ? null : o))
      .min(0)
      .max(50, "Location too long."),
    description: yup
      .string()
      .nullable()
      .transform((c, o) => (c === "" ? null : o))
      .min(0)
      .max(500, "Description too long."),
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
      type: "self",
      groupId: 0,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  // Register selected event props to states
  useEffect(() => {
    // console.log(selectedEvent);
    if (selectedEvent) {
      setValue("title", selectedEvent.title);
      setValue("type", selectedEvent.group_id ? "group" : "self");
      setValue("groupId", selectedEvent.group_id ? selectedEvent.group_id : 0);
      setValue("start", moment(selectedEvent.start).format("YYYY-MM-DDTHH:mm"));
      setValue("end", moment(selectedEvent.end).format("YYYY-MM-DDTHH:mm"));
      setValue("description", selectedEvent.descrip);
      setValue("location", selectedEvent.location);
    }
  }, [selectedEvent]);

  // Conditional render variables
  const isSelfSelected = watch("type") === "self";
  const isGroupSelected = watch("type") === "group";
  const isEditEvent = selectedEvent.id != null;
  const isEditSelfEvent = selectedEvent.group_id == null;
  const isEditGroupEvent = selectedEvent.group_id != null;

  // Some long style variables
  const groupColorGradients =
    // "bg-[linear-gradient(120deg,_#f87171,_#fb923c,_#4ade80,_#a78bfa,_#f472b6,_#22d3ee)]";
    "bg-[linear-gradient(120deg,_#60a5fa,_#f87171)]";

  const toggleEventType = (type) => {
    setValue("type", type);
  };

  // Triggered by submit button inside the form
  // Will only trigger if the validation passes yup schema
  const onSubmit = async (data) => {
    const event = {
      title: data.title,
      group_id: data.groupId !== 0 ? data.groupId : null,
      start: moment(data.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(data.end).format("YYYY-MM-DDTHH:mm"),
      location: data.location,
      description: data.description,
    };
    onSave(event);
    onClose();
  };

  return (
    <div className="modal-content p-3 w-fit h-fit bg-[#e5e7eb]">
      <form
        className="flex flex-col space-y-2"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title */}
        <div>
          <input
            className="px-1 h-10 text-2xl w-full bg-white rounded"
            type="text"
            placeholder="Event Title"
            {...register("title")}
          />
          <span className="block text-red-700">{errors.title?.message}</span>
        </div>
        {/* Type */}
        <div className="flex-col">
          <div className="flex space-x-1 justify-start">
            {/* Self Button */}
            {!isEditEvent && (
              <button
                id="Self"
                className={`h-12 px-6 text-lg rounded-md focus:shadow-outline ${
                  isSelfSelected ? "bg-blue-400 text-black" : " text-black"
                } ${isEditEvent ? "cursor-default" : "cursor-pointer"}`}
                type="button"
                onClick={() => toggleEventType("self")}
              >
                Self
              </button>
            )}
            {/* Self Label */}
            {isEditEvent && isEditSelfEvent && (
              <span
                className="p-1 text-lg font-mono font-bold text-slate-800 text-right rounded-md"
                style={{ backgroundColor: getColorById(0) }}
              >
                Self
              </span>
            )}
            {/* Group Button */}
            {!isEditEvent && (
              <button
                id="Group"
                className={`h-12 px-6 text-lg rounded-md focus:shadow-outline ${
                  isGroupSelected
                    ? `${groupColorGradients} text-black`
                    : "text-black"
                } ${isEditEvent ? "cursor-default" : "cursor-pointer"}`}
                type="button"
                onClick={() => toggleEventType("group")}
              >
                Group
              </button>
            )}
            {/* Group Dropdown */}
            {!isEditEvent && (
              <select
                id="group"
                className={`text-lg rounded-md bg-none w-44 ${
                  isGroupSelected ? "visible" : "invisible"
                } ${
                  isEditEvent
                    ? "cursor-default appearance-none pl-1"
                    : "cursor-pointer"
                }`}
                disabled={isEditEvent}
                {...register("groupId")}
              >
                <option key="placeholder" hidden value={0}>
                  Select Group
                </option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id} className="rounded">
                    {group.title}
                  </option>
                ))}
              </select>
            )}
            {/* Group Label */}
            {isEditEvent && isEditGroupEvent && (
              <span
                className="p-1 text-lg font-mono font-bold bg-blue-400 text-slate-800 text-right rounded-md"
                style={{
                  backgroundColor: getColorById(selectedEvent.group_id),
                }}
              >
                {
                  groups.filter(
                    (group) => group.id === selectedEvent.group_id
                  )[0].title
                }
              </span>
            )}
          </div>
          <span className="block text-red-700">{errors.type?.message}</span>
          <span className="block text-red-700">{errors.groupId?.message}</span>
        </div>
        <div className="flex flex-col space-y-1">
          {/* Start Time */}
          <div className="text-lg w-full flex items-center space-x-2">
            <label htmlFor="start-time" className="flex-1">
              Start Time:
            </label>
            <input
              id="start-time"
              className="text-lg bg-white rounded px-1"
              type="datetime-local"
              {...register("start")}
            />
          </div>
          {/* End Time */}
          <div className="text-lg w-full flex items-center space-x-2">
            <label htmlFor="end-time" className="flex-1">
              End Time:
            </label>
            <input
              id="end-time"
              className="text-lg bg-white rounded px-1"
              type="datetime-local"
              {...register("end")}
            />
          </div>
          <span className="block text-red-700">{errors.end?.message}</span>
        </div>
        {/* Location */}
        <div className="flex items-center relative w-full">
          <input
            className="p-1 text-lg bg-white w-full rounded pr-6"
            type="text"
            placeholder="Location"
            {...register("location")}
          />
          <MapPinIcon className="h-6 w-6 absolute right-0" />
          <span className="block text-red-700">{errors.location?.message}</span>
        </div>
        {/* Description */}
        <div>
          <textarea
            id="description"
            rows="4"
            className="p-1 w-full text-lg bg-blue-400 rounded border placeholder-slate-300 resize-none"
            placeholder="Description"
            {...register("description")}
          />
          <span className="block text-red-700">
            {errors.description?.message}
          </span>
        </div>
        {/* Buttons */}
        <div className="flex justify-between">
          <div>
            {/* Delete Button */}
            {isEditEvent && (
              <button
                className="h-12 px-6 bg-red-400 text-white rounded-md self-start hover:bg-red-500"
                type="button"
                onClick={onDelete}
              >
                Delete
              </button>
            )}
          </div>
          <div className="space-x-1">
            {/* Cancel Button */}
            <button
              className="h-12 px-6 bg-gray-600 text-white rounded-md self-end hover:bg-gray-700"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            {/* Confirm Button */}
            <button
              className="h-12 px-6 bg-gray-600 text-white rounded-md self-end hover:bg-gray-700"
              type="submit"
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddInterface;
