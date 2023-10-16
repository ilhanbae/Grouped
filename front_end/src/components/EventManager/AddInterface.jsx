import React, { useState } from 'react';

const AddInterface = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [isSelfSelected, setIsSelfSelected] = useState(false);
  const [isGroupSelected, setIsGroupSelected] = useState(false);

  const handleSave = () => {
    const event = {
      title,
      start,
      end,
    };

    onSave(event);
    onClose();
  };

  const toggleSelf = () => {
    setIsSelfSelected(true);
    setIsGroupSelected(false);
  };

  const toggleGroup = () => {
    setIsSelfSelected(false);
    setIsGroupSelected(true);
  };

  return (
    <div className="add-interface bg-[#e5e7eb] p-4 relative">
      {/* Close Button */}
      <button className="close-button absolute top-2 right-2 bg-red-500 text-black w-10 h-10 rounded-full flex justify-center items-center cursor-pointer" onClick={onClose}>
        <i className="text-xl">X</i>
      </button>
      <div className="overlay-content bg-[#e5e7eb] flex flex-col">
        <input className="h-12 m-2 text-2xl bg-[#e5e7eb]"
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <div className="flex flex-wrap">
          <button id="Self" className={`h-12 px-6 m-2 text-lg rounded-lg focus:shadow-outline
            ${isSelfSelected ? 'bg-cyan-200 text-black' : 'text-black'}`}
            onClick={toggleSelf}>Self</button>
          <button id="Group" className={`h-12 px-6 m-2 text-lg rounded-lg focus:shadow-outline
            ${isGroupSelected ? 'bg-cyan-200 text-black' : 'text-black'}`}
            onClick={toggleGroup}>Group</button>
        </div>
        <br />
        <span className="text-lg">Start Time:</span>
        <input className="text-lg bg-[#e5e7eb]"
          type="datetime-local"
          value={start.toISOString().substring(0, 16)}
          onChange={(e) => setStart(new Date(e.target.value))}
        />
        <br/>
        <span className="text-lg">End Time:</span>
        <input className="text-lg bg-[#e5e7eb]"
          type="datetime-local"
          value={end.toISOString().substring(0, 16)}
          onChange={(e) => setEnd(new Date(e.target.value))}
        />
        <br />
        <textarea
          id="description"
          rows="4"
          className="block p-2.5 w-full text-sm text-[#020617] bg-[#0ea5e9] rounded-lg border focus:ring-blue-500 focus:border-blue-500"
          placeholder="Description"
        ></textarea>
        <div style={{ textAlign: "right" }}>
          <button
            onClick={handleSave}
            className="h-12 m-2 px-6 bg-gray-600 text-white"
          >
            Confirm
          </button>
          <button
            className="h-12 m-2 px-6 bg-gray-600 text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInterface;
