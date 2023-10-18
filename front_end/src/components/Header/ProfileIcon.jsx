import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

// outline-blue-400 outline-2 outline
const ProfileIcon = (props) => {
  return (
    <div className="flex items-center justify-center rounded-full bg-slate-50 cursor-pointer">
      <UserCircleIcon
        className={`w-10 h-10 text-slate-800 bg-slate-100 shadow-2xl rounded-full ${
          props.isMenuOpen ? "ring-blue-400 ring-2" : "ring-0"
        }`}
        onClick={props.toggleMenu}
      />
    </div>
  );
};

export default ProfileIcon;
