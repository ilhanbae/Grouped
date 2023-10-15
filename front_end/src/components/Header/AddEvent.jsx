import React, { useState } from 'react';
import './AddEvent.css';

const AddEvent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={toggleDropdown}>
        <i className={`icon ${isOpen ? 'open' : ''}`}>+</i>
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {/* Dropdown content goes here */}
        </div>
      )}
    </div>
  );
}

export default AddEvent;
