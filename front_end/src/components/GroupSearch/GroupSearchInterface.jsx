import React, { useState, useEffect } from "react";
import SettingInterface from "../DisplaySetting/SettingInterface";

const GroupSearchInterface = ({ toggleSetting }) => {
  // need to fetch groups
  const [groups, setGroups] = useState([
    {
      id: 1,
      title: "Test",
      description: "Testing description",
      members: ["Testone", 'Testtwo', 'Testthree']
    },
    {
      id: 2,
      title: "Library",
      description: "Library description",
      members: ["Libraryone", 'Librarytwo', 'Librarythree']
    },
    {
      id: 3,
      title: "CSE442",
      description: "CSE442 description",
      members: ["CSE442one", 'CSE442two', 'CSE442three']
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
      description: "End description",
      members: ["Endone", 'Endtwo', 'Endthree']
    },
  ]);
  const [showSetting, setShowSetting] = useState(false);

  return (
    <div className="modal-content w-72 h-72 flex flex-col justify-evenly space-y-3 bg-slate-200">
      <div>
          {/* Display Setting Interface */}
          {showSetting && (
             <div className="modal-overlay w-full h-full">
               <SettingInterface toggleSetting={toggleSetting} />
             </div>
          )}

          {/* Back Button */}
          <button
            className="float-left p-1 rounded text-white font-bold bg-slate-400 hover:bg-slate-500 display:inline"
            type="button"
            onClick={() => setShowSetting(true)}
          >
            Back
          </button>
          {/* Create Group */}
          <button className="float-right p-1 rounded text-white font-bold bg-slate-400 hover:bg-slate-500 display:inline">
            Create Group
          </button>
      </div>
      {/* Search Field */}
      <input
          id="search"
          className="p-1 w-full text-lg text-[#660033] bg-white rounded border placeholder-slate-300 focus:[#ffcccc] focus:[#ebbcbc] resize-none"
          placeholder="Search"
        />

      {/* Search Field */}
      <h1 className="font-bold self-start">Group Display Option</h1>
      <div className="bg-slate-100 rounded-md w-full h-3/5 p-1 space-y-1 overflow-y-scroll">
        {groups.map((group) => (
          <div className="flex p-1 rounded-sm" key={group.id}>
            <span htmlFor={group.id} className="w-full rounded-sm px-1">
              <div>{group.title} {group.description}
               <button className="w-full p-1 rounded text-white font-bold bg-slate-400 hover:bg-slate-500">
                Join
               </button>
               {group.members}</div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupSearchInterface;
