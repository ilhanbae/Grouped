import React, { useState, useRef, useEffect } from 'react';
import './AddEvent.css';

const AddEvent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownMenu = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  /* This hook checks if mousedown DOM event occurs outside the dropdown menu. */
    useEffect(() => {
      const outSideClickHandler = (event) => {
        if (
          dropDownMenu.current &&
          !dropDownMenu.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", outSideClickHandler);
      return () => {
        document.removeEventListener("mousedown", outSideClickHandler);
      };
    });


  return (
    <div className="dropdown" ref={dropDownMenu}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        <i className={`icon ${isOpen ? 'open' : ''}`}>+</i>
      </button>
      {isOpen && (
        <div className="dropdown-content absolute right-1 rounded-md bg-slate-200">
          <button className='add-event-button flex bg-slate-300 rounded-md p-2 m-1 hover:bg-slate-400'>+ Add Event </button>
        </div>
      )}
    </div>
  );
}

export default AddEvent;
