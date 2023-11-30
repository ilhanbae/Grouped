import React, { useState } from "react";

const CreateGroup = ({ onClose, onSave }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleSave() {
        onSave({title, description, members: []});
        onClose();
    }

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
                onClick={handleSave}
                >
                Save
              </button>
          </div>
      </form>
    </div>
  );
};

export default CreateGroup;
