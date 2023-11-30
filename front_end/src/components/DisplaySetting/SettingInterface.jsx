import React, { useState, useEffect } from "react";

const SettingInterface = ({ toggleSetting, closeSetting }) => {
  // need to fetch groups
  const [groups, setGroups] = useState([
      {
        id: 1,
        title: "Bad Test",
        description: "There should never be 0 members",
        members: []
      },
      {
        id: 2,
        title: "Library",
        description: "Library description",
        members: ["Libraryone", 'Librarytwo']
      },
      {
        id: 3,
        title: "CSE442",
        description: "CSE442 description",
        members: ["CSE442one"]
      },
      {
        id: 4,
        title: "UB",
        description: "UB description",
        members: ["UBone", 'UBtwo', 'UBthree']
      },
      {
        id: 5,
        title: "End",
        description: null,
        members: ["Endone", 'Endtwo', 'Endthree']
      }
    ]);

  return (
    <div className="modal-content w-72 h-72 flex flex-col items-center justify-evenly space-y-3 bg-slate-200">
      {/* Join Button */}
      <button
        className="w-full p-1 rounded text-white font-bold bg-slate-400 hover:bg-slate-500"
        type="button"
        onClick={() => toggleSetting()}
      >
        Join Group
      </button>
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
        onClick={closeSetting}
      >
        Close
      </button>
    </div>
  );
};

export default SettingInterface;
