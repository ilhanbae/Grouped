import React, { useState, useEffect } from "react";
import CreateGroup from "../CreateGroup/CreateGroup";

const GroupSearchInterface = ({ toggleSetting }) => {
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
      description: "End description",
      members: ["Endone", 'Endtwo', 'Endthree']
    }
  ]);
  const [showCreate, setCreate] = useState(false);

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
          <button
            className="float-right p-1 rounded text-white font-bold bg-slate-400 hover:bg-slate-500 display:inline"
            onClick={() => setCreate(true)}
          >
            Create Group
          </button>
          {showCreate && (
              <div className="modal-overlay w-full h-full">
                <CreateGroup/>
              </div>
          )}
      </div>
      {/* Search Field */}
      <input
          id="search"
          className="p-1 w-full text-lg text-[#660033] text-center bg-white rounded border placeholder-slate-300 focus:[#ffcccc] focus:[#ebbcbc] resize-none"
          placeholder="Search"
        />

      {/* Groups Info */}
      <div className="bg-slate-100 rounded-md w-full h-3/5 p-2 space-y-1 overflow-y-scroll">
        {groups.map((group) => (
          <div className="flex p-1 rounded-sm" key={group.id}>
            <span htmlFor={group.id} className="w-full rounded-sm px-1">
              <div className= 'bg-white p-1'>
                  <div className="font-bold text-lg">
                    {group.title}
                    <button className="float-right w-1/2 rounded text-white font-normal bg-slate-400 hover:bg-slate-500">
                        Join
                    </button>
                  </div>
                  <div className="bg-white">
                   <span className="float-left">{group.description}</span>
                   <span className="float-right ml-10">{group.members.length} Members</span>
                  </div>
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupSearchInterface;
