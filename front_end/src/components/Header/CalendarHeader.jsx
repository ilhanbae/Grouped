import React from "react";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import Logo from "./Logo";
import AddEvent from "./AddEvent";

const CalendarHeader = ({onCreateEvent}) => {

    return (
    <nav className="flex min-w-full items-center justify-between p-3 bg-slate-700">
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="flex items-center">
        <AddEvent onCreateEvent={onCreateEvent}/>
        <div style={{ marginLeft: "10px" }} />
        <ProfileDropdownMenu />
      </div>
    </nav>
    );
};

export default CalendarHeader;
