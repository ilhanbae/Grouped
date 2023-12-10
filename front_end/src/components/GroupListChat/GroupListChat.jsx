import React from 'react';
import "./GroupListChat.css";

const GroupListChat = ({ groups, onSelectGroup, onClose }) => {
  return (
    <div className="group-list-modal">
      <div className="header">
        <span className="flex items-center">Select a Group</span>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <ul className="overflow-y-auto m-4">
        {groups.length === 0 ? (
          <div className="">
            <p>You have not joined any groups yet. </p>
            <p>Join a group to start chatting!</p>
          </div>
        ) : (
          groups.map((group) => (
            <li key={group.id} onClick={() => onSelectGroup(group)}>
              <div className="bg-white font-bold rounded-full p-1 mb-2 flex items-center group-list-item">
                {group.title}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default GroupListChat;
