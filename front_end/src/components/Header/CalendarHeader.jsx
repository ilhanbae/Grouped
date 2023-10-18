import React, { useEffect, useState } from "react";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import Logo from "./Logo";
import AddEvent from "./AddEvent";
import axios from "axios";

const CalendarHeader = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    setIsLoaded(false);
    await axios
      .get(`${process.env.REACT_APP_API_URL}/user.php`, {
        params: {
          email: sessionStorage.getItem("email"),
        },
      })
      .then((response) => {
        setUsername(response.data.username ? response.data.username : "");
      })
      .catch((error) => console.error(error));
    setIsLoaded(true);
  };

  if (!isLoaded) {
    return (
      <nav className="flex min-w-full items-center justify-between p-3 bg-slate-700"></nav>
    );
  } else
    return (
      <nav className="flex min-w-full items-center justify-between p-3 bg-slate-700">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center">
          <AddEvent />
          <div style={{ marginLeft: "10px" }} />
          <ProfileDropdownMenu username={username} />
        </div>
      </nav>
    );
};

export default CalendarHeader;
