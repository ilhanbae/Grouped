import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    firstname: "John",
    lastname: "Doe",
    bio: "Hi!\nI am John Doe.",
    email: "tester@example.com",
    school: "University at Buffalo",
    // firstname: "",
    // lastname: "",
    // bio: "",
    // email: "",
    // school: ""
  });

  useEffect(() => {
    // loadUserInfo();
  }, []);

  const loadUserInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/endpoint`)
      .then((response) => setUserInfo(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex items-center flex-col bg-slate-300">
      {/* User Fields */}
      <div className="bg-slate-300 p-8 rounded-lg flex flex-col w-72">
        {/* First Name */}
        <div className="mb-4 flex flex-col">
          <label className="text-gray-600" htmlFor="firstname">
            First Name:
          </label>
          <input
            className="rounded-md w-full px-1 bg-slate-100 text-gray-800"
            id="firstname"
            type="text"
            value={userInfo.firstname}
            readOnly
          />
        </div>
        {/* Last Name */}
        <div className="mb-4 flex flex-col">
          <label className="text-gray-600" htmlFor="lastname">
            Last Name:
          </label>
          <input
            className="rounded-md w-full px-1 bg-slate-100 text-gray-800"
            id="lastname"
            type="text"
            defaultValue={userInfo.lastname}
            readOnly
          />
        </div>
        {/* Bio */}
        <div className="mb-4 flex flex-col">
          <label className="text-gray-600" htmlFor="bio">
            Bio:
          </label>
          <textarea
            className="rounded-md px-1 bg-slate-100 text-gray-800 resize-none"
            id="bio"
            defaultValue={userInfo.bio}
            rows={6}
            readOnly
          />
        </div>
        {/* Email */}
        <div className="mb-4 flex flex-col">
          <label className="text-gray-600" htmlFor="email">
            Email:
          </label>
          <input
            className="rounded-md w-full px-1 bg-slate-100 text-gray-800"
            id="email"
            type="text"
            defaultValue={userInfo.email}
            readOnly
          />
        </div>
        {/* School */}
        <div className="mb-4 flex flex-col" htmlFor="school">
          <label className="text-gray-600">School:</label>
          <input
            className="rounded-md w-full px-1 bg-slate-100 text-gray-800"
            id="school"
            type="text"
            defaultValue={userInfo.school}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
