import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    school: "Not Applicable",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // loadUserInfo();
  }, []);

  const loadUserInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/endpoint`)
      .then((response) => setUserInfo(response))
      .catch((error) => console.log(error));
  };

  const universityOptionList = [
    "Not Applicable",
    "University at Buffalo",
    "Stanford University",
    "Carnegie Mellon University",
    "Harvard University",
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo({ ...userInfo, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    // TODO: Should confirm if the user really want to return to previous page
    navigate("/manageaccount");
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
            maxLength={50}
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
            maxLength={50}
          />
        </div>
        {/* Bio */}
        <div className="flex flex-col">
          <label className="text-gray-600" htmlFor="bio">
            Bio:
          </label>
          <textarea
            className="rounded-md w-full px-1 bg-slate-100 text-gray-800 focus:outline focus:shadow-outline resize-none"
            id="bio"
            placeholder={"Enter your bio"}
            value={userInfo.bio}
            onChange={handleChange}
            rows={6}
            maxLength={150}
          />
          <span className="text-gray-600 text-right">
            {userInfo.bio.length}/150
          </span>
        </div>
        {/* School */}
        <div className="mb-4 flex flex-col">
          <label className="text-gray-600" htmlFor="school">
            School:
          </label>
          <select
            className="rounded-md w-full px-1 bg-slate-100 text-gray-800 focus:outline focus:shadow-outline resize-none"
            id="school"
            defaultValue={
              universityOptionList.includes(userInfo.school)
                ? userInfo.school
                : "default"
            }
            onChange={handleChange}
          >
            {!universityOptionList.includes(userInfo.school) && (
              <option disabled value="default">
                Choose your school
              </option>
            )}
            {universityOptionList.map((university, index) => (
              <option key={index} value={university}>
                {university}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        {/* Conditionally render buttons based on user's login state */}
        {sessionStorage.getItem("user") ? (
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
        ) : (
          <button
            className="w-full py-1 rounded text-white bg-green-400 font-bold hover:bg-green-500"
            type="submit"
          >
            Create Account
          </button>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
