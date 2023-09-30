import React, { useState } from "react";

export const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({
    firstname: "John",
    lastname: "Doe",
    bio: "Hello, I am John Doe!",
    email: "tester@buffalo.edu",
    school: "University at Buffalo",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  };

  return (
    <div className="min-h-screen flex items-center flex-col bg-slate-300">
      {/* Header */}
      <div className="min-w-full bg-slate-700 p-3">
        <h1 className="">Edit My Profile</h1>
      </div>
      {/* User Fields */}
      <form className="bg-slate-300 p-8 rounded-lg flex flex-col w-72">
        {/* First Name */}
        <div className="mb-4">
          <label className="text-gray-600" htmlFor="firstname">
            First Name:
          </label>
          <input
            className="rounded-md w-full px-1 bg-slate-100 text-gray-800 focus:outline focus:shadow-outline"
            id="firstname"
            type="text"
            placeholder={"Enter your first name"}
            value={userInfo.firstname}
            onChange={handleChange}
          />
        </div>
        {/* Last Name */}
        <div className="mb-4">
          <label className="text-gray-600" htmlFor="lastName">
            Last Name:
          </label>
          <input
            className="rounded-md w-full px-1 bg-slate-100 text-gray-800 focus:outline focus:shadow-outline"
            id="lastname"
            type="text"
            placeholder={"Enter your last name"}
            value={userInfo.lastname}
            onChange={handleChange}
          />
        </div>
        {/* Bio */}
        <div className="mb-4">
          <label className="text-gray-600" htmlFor="bio">
            Bio:
          </label>
          <input
            className="rounded-md w-full px-1 bg-slate-100 text-gray-800 focus:outline focus:shadow-outline"
            id="bio"
            type="text"
            placeholder={"Enter your bio"}
            value={userInfo.bio}
            onChange={handleChange}
          />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label className="text-gray-600" htmlFor="email">
            Email:
          </label>
          <input
            className="rounded-md w-full px-1 bg-slate-100 text-gray-800 focus:outline focus:shadow-outline"
            id="email"
            type="text"
            placeholder={"Enter your email address"}
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        {/* School */}
        <div className="mb-4">
          <label className="text-gray-600" htmlFor="school">
            School:
          </label>
          <input
            className="rounded-md w-full px-1 bg-slate-100 text-gray-800 focus:outline focus:shadow-outline"
            id="school"
            type="text"
            placeholder={"Enter your school name"}
            value={userInfo.school}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};
