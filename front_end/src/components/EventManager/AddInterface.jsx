import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { MapPinIcon } from '@heroicons/react/24/outline';

const AddInterface = ({ onClose, onDelete, onSave, selectedEvent, fromCalendar }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSelfSelected, setIsSelfSelected] = useState(fromCalendar === 'individual');
  const [isGroupSelected, setIsGroupSelected] = useState(!isSelfSelected);

  const haveDelete = selectedEvent.title == null? false : true;

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setStart(moment(selectedEvent.start).format("YYYY-MM-DDTHH:mm"));
      setEnd(moment(selectedEvent.end).format("YYYY-MM-DDTHH:mm"));
      setDescription(selectedEvent.descrip);
      setLocation(selectedEvent.location);

      if (fromCalendar === 'individual') {
        setIsSelfSelected(true);
        setIsGroupSelected(false);
      }
    }
  }, [selectedEvent, fromCalendar]);

  const handleSave = () => {
    const event = {
      title,
      start,
      end,
      location,
      description,
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
    <div className="add-interface bg-[#e5e7eb] p-1">
      <div className="overlay-content bg-[#e5e7eb] flex flex-col">
        <input
          className="h-10 m-2 text-2xl bg-white"
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex">
          <button
            id="Self"
            className={`h-12 px-6 m-2 text-lg rounded-lg focus:shadow-outline ${
              isSelfSelected ? 'bg-cyan-200 text-black' : 'text-black'
            }`}
            onClick={toggleSelf}
          >
            Self
          </button>
          <button
            id="Group"
            className={`h-12 px-6 m-2 text-lg rounded-lg focus:shadow-outline ${
              isGroupSelected ? 'bg-cyan-200 text-black' : 'text-black'
            }`}
            onClick={toggleGroup}
          >
            Group
          </button>
        </div>
        <span className="text-lg py-2"><span>Start Time: </span>
            <input
              className="text-lg bg-[#e5e7eb] bg-white"
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
        </span>
        <span className="text-lg py-2"><span>End Time: </span>
            <input
              className="text-lg bg-[#e5e7eb] bg-white"
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
        </span>
        <div className="location-container flex items-center py-2">
        <input
          className="text-lg bg-[#e5e7eb] bg-white"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <MapPinIcon className="location-icon h-6 w-6"/>
        </div>
        <textarea
          id="description"
          rows="4"
          className="block py-2 w-full text-sm text-[#020617] bg-[#0ea5e9] rounded-lg border focus:ring-blue-500 focus:border-blue-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4">
            <div className="flex flex-wrap">
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
              {haveDelete && (
                  <button
                    className="h-12 m-2 px-6 bg-red-400 text-white rounded-md hover:bg-red-500"
                    onClick={onDelete}
                  >
                    Delete
                  </button>
                  )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddInterface;
