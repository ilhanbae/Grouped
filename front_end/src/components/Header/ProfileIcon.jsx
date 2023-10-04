import React from "react";

const ProfileIcon = (props) => {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 cursor-pointer"
      onClick={props.toggleMenu}
    >
      <span className="font-bold">{props.userInitial}</span>
    </div>
  );
};

export default ProfileIcon;
