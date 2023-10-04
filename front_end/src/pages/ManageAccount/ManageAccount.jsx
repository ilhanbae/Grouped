import React from "react";
import { Link } from "react-router-dom";

const ManageAccount = () => {
  return (
    <div className="flex items-center flex-col bg-slate-300">
      {/* Links */}
      <div className="min-h-full min-w-full flex flex-col items-center justify-center flex-grow ">
        {/* Edit Account Information */}
        <Link
          className="p-3 rounded-md text-white bg-slate-400 hover:bg-slate-500"
          to="/editprofile"
        >
          Edit Account Information
        </Link>
      </div>
    </div>
  );
};

export default ManageAccount;
