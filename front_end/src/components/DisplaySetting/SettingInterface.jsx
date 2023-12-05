import React, { useState, useEffect } from "react";
import { getColorById } from "../../utils/getEventProp";

const SettingInterface = ({
  groups,
  closeSetting,
  updateDisplayOptions,
  displayOptions,
}) => {
  return (
    <div className="modal-content w-72 h-72 flex flex-col items-center justify-evenly space-y-3 bg-slate-200">
      {/* Display Options */}
      <h1 className="font-bold self-start">Select Group(s) to Display</h1>
      <div className="bg-slate-100 rounded-md w-full h-full p-1 space-y-1 overflow-y-scroll">
        {/* Self Option */}
        <div className="flex p-1 rounded-sm">
          <input
            type="checkbox"
            id={"self"}
            className="w-8 cursor-pointer"
            style={{ accentColor: getColorById(0) }}
            onChange={() => updateDisplayOptions(0)}
            checked={displayOptions[0]}
          />
          <span htmlFor={"self"} className="w-full rounded-sm px-1">
            Self
          </span>
        </div>
        {/* Group Options */}
        {groups.map((group) => (
          <div className="flex p-1 rounded-sm" key={group.id}>
            <input
              type="checkbox"
              id={group.id}
              className="w-8 cursor-pointer"
              style={{ accentColor: getColorById(group.id) }}
              onChange={() => updateDisplayOptions(group.id)}
              checked={displayOptions[group.id]}
            />
            <span htmlFor={group.id} className="w-full rounded-sm px-1">
              {group.title}
            </span>
          </div>
        ))}
      </div>
      {/* Close Button */}
      <button
        className="p-1 rounded text-white font-bold bg-slate-400 hover:bg-slate-500"
        type="button"
        onClick={closeSetting}
      >
        Close
      </button>
    </div>
  );
};

export default SettingInterface;
