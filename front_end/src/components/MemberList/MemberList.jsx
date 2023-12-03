import React from "react";

const MemberList = ({ group, onClose }) => {
  return (
    <div className="modal-content w-full h-full flex flex-col justify-evenly space-y-3 bg-slate-200">
      <h2 className="text-center text-2xl font-bold mb-4 bg-white">
        {group.title}
      </h2>
      <ul className="overflow-y-scroll">
        {group.members.map((member, index) => (
          <li className="text-l m-1 text-center bg-white" key={index}>
            {member.username}
          </li>
        ))}
      </ul>
      <button
        className="p-2 rounded text-white font-bold bg-slate-400 hover:bg-slate-500"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default MemberList;
