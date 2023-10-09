import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ManageAccount = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // TODO: Should confirm if the user really want to logout
    navigate("/");
  };

  return (
    <div className="h-full flex flex-col items-center bg-slate-300">
      {/* Links */}
      <div className="h-full w-72 flex items-center text-center justify-center flex-col  space-y-3">
        {/* Edit Account Information */}
        <Link
          className="w-full p-3 rounded-md text-white bg-slate-400 hover:bg-slate-500"
          to="/editprofile"
        >
          Edit Account Information
        </Link>
        <Link
          className="w-full p-3 rounded-md text-white bg-slate-400 hover:bg-slate-500"
          to="/resetpassword"
        >
          Reset Password
        </Link>
        {/* Edit Account Information */}
        <button
          className="w-full p-3 rounded-md text-white bg-slate-400 hover:bg-slate-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ManageAccount;
