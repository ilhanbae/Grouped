import React, { useState, useRef, useEffect } from 'react';
import './AddEvent.css';
import AddInterface from '../EventManager/AddInterface';
import {useLocation} from 'react-router-dom';

const AddEvent = ({onCreateEvent}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddInterfaceOpen, setIsAddInterfaceOpen] = useState(false);
  const dropDownMenu = useRef(null);
  const location = useLocation();

  let calendar = "";
  if (location.pathname === "/individualCalendar"){
    calendar = "individual";
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsAddInterfaceOpen(false);
  };

  const openOptions = () => {
    setIsOpen(true);
  };

  const openAddInterface = () => {
      setIsAddInterfaceOpen(true);
  };

  /* This hook checks if mousedown DOM event occurs outside the dropdown menu. */
    useEffect(() => {
      const outSideClickHandler = (event) => {
        if (
          dropDownMenu.current &&
          !dropDownMenu.current.contains(event.target)
        ) {
          setIsOpen(false);
          setIsAddInterfaceOpen(false);
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
          <button className='add-event-button flex bg-slate-300 rounded-md p-2 m-1 hover:bg-slate-400'
          onClick={openAddInterface}>+ Add Event</button>
        </div>
      )}
       {isAddInterfaceOpen && (
        <div className="center-screen bg-black w-1/2">
        <AddInterface
            onClose={() => setIsAddInterfaceOpen(false)}
            onSave={(event) => {
                onCreateEvent(event);
                setIsAddInterfaceOpen(false);
                console.log("AddEvent message", event);
            }}
            fromCalendar = {calendar}
            />
        </div>
       )}
    </div>
  );
}

export default AddEvent;