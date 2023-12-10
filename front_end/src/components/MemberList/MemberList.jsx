import React, { useState } from "react";
import axios from "axios";

const MemberList = ({ group, onClose }) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstname: "",
    lastname: "",
    bio: "",
    email: "",
  });

  const handleMemberSelect = async (member) => {
    // Fetch the user profile information based on the selected member
    setIsLoaded(false);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user.php`,
        {
          params: {
            username: member.username,
            firstname: member.firstname,
            lastname: member.lastname,
            bio: member.bio,
            email: member.email,
          },
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      setUserInfo({
        username: response.data.username || "",
        firstname: response.data.firstName || "",
        lastname: response.data.lastName || "",
        bio: response.data.bio || "",
        email: response.data.email || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoaded(true);
    }

    // Set the selected member to display the user profile
    setSelectedMember(member);
  };

  return (
    <div className="modal-content w-full h-full flex flex-col justify-evenly space-y-3 bg-slate-200">
      <h2 className="text-center text-2xl font-bold mb-4 bg-white">
        {group.title}
      </h2>
      <ul className="overflow-y-scroll">
        {group.members.map((member, index) => (
          <li
            className="text-l m-1 text-center text-sky-400 underline bg-white cursor-pointer"
            key={index}
            onClick={() => handleMemberSelect(member)}
          >
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

      {/* Display the UserProfile component when a member is selected */}
      {selectedMember && (
        <div className="modal-overlay w-full h-auto flex items-center justify-center">
          <div className="modal-content w-96 h-auto bg-slate-200 p-4">
            <h2 className="text-center text-2xl font-bold bg-white mb-4">
              {userInfo.username}'s Profile
            </h2>
            {isLoaded ? (
              <div className="bg-white">
                <p>
                  <strong>First Name:</strong> {userInfo.firstname}
                </p>
                <p>
                  <strong>Last Name:</strong> {userInfo.lastname}
                </p>
                <p>
                  <strong>Bio:</strong> {userInfo.bio}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
              </div>
            ) : (
              <div>Loading...</div>
            )}
            <button
              className="p-2 mt-3 rounded text-white font-bold bg-slate-400 hover:bg-slate-500"
              onClick={() => setSelectedMember(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberList;
