import React, { useState } from "react";
import axios from "axios";

const CreateGroup = ({ onClose, loadGroupsAndMembers, loadUserGroups }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  // async function handleSave() {
  //   try {
  //     // Call the onSave function and update the groups
  //     await onSave({ title, description, members: [""] });
  //     onClose();
  //   } catch (error) {
  //     console.error("Error saving group:", error);
  //   }
  // }
  const handleCreate = async (e) => {
    e.preventDefault();
    const data = {
      user_id: sessionStorage.getItem("id"),
      username: sessionStorage.getItem("username"),
      invite_flag: isPrivate,
      group_title: title,
      group_desc: description,
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL}/group.php`, data)
      .then((response) => {
        console.log(response.data);
        // Update all groups & joined members
        loadGroupsAndMembers();

        // Update joined groups
        loadUserGroups();
      })
      .catch((error) => console.error(error));
    onClose();
  };

  return (
    <div className="modal-content w-full h-auto flex flex-col justify-evenly space-y-3 bg-slate-200">
      <form>
        {/* Title Field */}
        <input
          id="Title"
          className="p-1 w-full mt-5 text-lg text-[#660033] text-center bg-white rounded border placeholder-slate-300 focus:[#ffcccc] focus:[#ebbcbc] resize-none"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Description Field */}
        <textarea
          id="Description"
          rows="3"
          className="p-1 w-full text-lg mt-5 text-[#660033] text-center bg-white rounded border placeholder-slate-300 focus:[#ffcccc] focus:[#ebbcbc] resize-none"
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="m-2">
          {/* Cancel Button*/}
          <button
            className="float-left p-1 rounded text-white font-bold bg-slate-400 hover:bg-slate-500 display:inline"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          {/* Save Button*/}
          <button
            className="float-right p-1 rounded text-white font-bold bg-slate-400 hover:bg-slate-500 display:inline"
            type="submit"
            onClick={handleCreate}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
