import React, { useState, useEffect } from "react";

const CreateGroup = ({ toggleSetting }) => {
  // need to fetch groups
  const [groups, setGroups] = useState([
    {
      id: 1,
      title: "Test",
      description: "Testing description",
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
      description: "End description",
      members: ["Endone", 'Endtwo', 'Endthree']
    }
  ]);
  const [showSetting, setShowSetting] = useState(false);

  return (
    <div className="modal-content w-auto h-96 flex flex-col justify-evenly space-y-3 bg-slate-200">
      <div>
          {/* Back Button */}
          <button
            className="float-left p-1 rounded text-white font-bold bg-slate-400 hover:bg-slate-500 display:inline"
            type="button"
            onClick={() => toggleSetting()}
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
          className="p-1 w-full text-lg text-[#660033] text-center bg-white rounded border placeholder-slate-300 focus:[#ffcccc] focus:[#ebbcbc] resize-none"
          placeholder="Search"
        />
    </div>
  );
};

export default CreateGroup;
