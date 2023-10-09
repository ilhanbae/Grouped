import React, { useState } from "react";

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({
    firstname: "John",
    lastname: "Doe",
    bio: "Hello, I am John Doe!",
    school: "University at Buffalo",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCancel = (e) => {
    setUserInfo({
      firstname: "John",
      lastname: "Doe",
      bio: "Hello, I am John Doe!",
      school: "University at Buffalo",
    });
  };

  return (
    <div className="flex items-center flex-col bg-slate-300">
      {/* User Info Form */}
      <form
        className="bg-slate-300 p-8 rounded-lg flex flex-col w-72"
        onSubmit={handleSubmit}
      >
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
        {/* Buttons */}
        <div className="flex flex-col space-y-4 ">
          <button
            className="w-full py-1 rounded text-white bg-green-400 font-bold hover:bg-green-500"
            type="submit"
          >
            Submit Changes
          </button>
          <button
            className="w-full py-1 rounded text-white bg-red-400 font-bold hover:bg-red-500"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;