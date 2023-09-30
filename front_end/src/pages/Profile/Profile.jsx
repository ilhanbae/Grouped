import React from "react";

export const Profile = () => {
  const user = {
    firstname: "John",
    lastname: "Doe",
    bio: "Hello, I am tester!",
    email: "tester@buffalo.edu",
    school: "University at Buffalo",
  };

  return (
    <div className="min-h-screen flex items-center flex-col bg-slate-300">
      {/* Header */}
      <div className="min-w-full bg-slate-700 p-3">
        <h1 className="">My Profile</h1>
      </div>

      {/* User Fields */}
      <div className="bg-slate-300 p-8 rounded-lg flex flex-col w-72">
        {/* First Name */}
        <div className="mb-4">
          <label className="text-gray-600">First Name:</label>
          <p className="text-gray-800 bg-slate-100 rounded-md px-1">{user.firstname}</p>
        </div>
        {/* Last Name */}
        <div className="mb-4">
          <label className="text-gray-600">Last Name:</label>
          <p className="text-gray-800 bg-slate-100 rounded-md px-1">{user.lastname}</p>
        </div>
        {/* Bio */}
        <div className="mb-4">
          <label className="text-gray-600">Bio:</label>
          <p className="text-gray-800 bg-slate-100 rounded-md px-1">{user.bio}</p>
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="text-gray-600">Email:</label>
          <p className="text-gray-800 bg-slate-100 rounded-md px-1">{user.email}</p>
        </div>
        {/* School */}
        <div className="mb-4">
          <label className="text-gray-600">School:</label>
          <p className="text-gray-800 bg-slate-100 rounded-md px-1">{user.school}</p>
        </div>
      </div>
    </div>
  );
};
