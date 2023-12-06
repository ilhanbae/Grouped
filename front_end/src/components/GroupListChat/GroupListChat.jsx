import React from 'react';
import "./GroupListChat.css";

const GroupListChat = ({ groups, onSelectGroup, onClose }) => {
  return (
    <div className="group-list-modal">
        <div className="header">
        <span className="flex alignItems-center">
            Select a Group
        </span>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        </div>
      <ul className="items-center m-4">
        {groups.map((group) => (
          <li key={group.id} onClick={() => onSelectGroup(group)}>
            <div className='bg-white font-bold rounded-full p-1 mb-2 flex items-center group-list-item'>{group.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupListChat;
