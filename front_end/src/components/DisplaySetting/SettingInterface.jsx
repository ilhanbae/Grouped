import React, { useState, useEffect } from "react";
import GroupSearchInterface from "../GroupSearch/GroupSearchInterface";

const SettingInterface = ({ toggleSetting }) => {
  // need to fetch groups
  const [groups, setGroups] = useState([
    {
      id: 1,
      title: "Test",
    },
    {
      id: 2,
      title: "Library",
    },
    {
      id: 3,
      title: "CSE442",
    },
    {
      id: 4,
      title: "UB",
    },
    {
      id: 5,
      title: "End",
    },
  ]);

  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="modal-content w-72 h-72 flex flex-col items-center justify-evenly space-y-3 bg-slate-200">
      {/* Join Button */}
      <button
        className="w-full p-1 rounded text-white font-bold bg-slate-400 hover:bg-slate-500"
        type="button"
        onClick={() => setShowSearch(true)}
      >
        Join Group
      </button>
      {showSearch && (
                 <div className="modal-overlay w-full h-full">
                   <GroupSearchInterface toggleSetting={toggleSetting} />
                 </div>
               )}
      {/* Options */}
      <h1 className="font-bold self-start">Group Display Option</h1>
      <div className="bg-slate-100 rounded-md w-full h-3/5 p-1 space-y-1 overflow-y-scroll">
        {groups.map((group) => (
          <div className="flex p-1 rounded-sm" key={group.id}>
            <input
              type="checkbox"
              id={group.id}
              className="w-8 accent-blue-400 cursor-pointer"
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
        onClick={toggleSetting}
      >
        Close
      </button>
    </div>
  );
};

export default SettingInterface;
