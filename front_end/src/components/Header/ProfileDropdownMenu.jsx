import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProfileDropdownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = {
    firstname: "John",
    lastname: "Doe",
    bio: "Hello, I am John Doe!",
    email: "tester@buffalo.edu",
    school: "University at Buffalo",
  };
  const userInitial = user.firstname[0] + user.lastname[0];
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <ProfileIcon userInitial={userInitial} toggleMenu={toggleMenu} />
      {isMenuOpen && <DropdownLinks />}
    </div>
  );
};

const ProfileIcon = (props) => {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 cursor-pointer"
      onClick={props.toggleMenu}
    >
      <span className="font-bold">{props.userInitial}</span>
    </div>
  );
};

const DropdownLinks = (props) => {
  const links = [
    { label: "Profile", url: "/profile" },
    { label: "Manage Account", url: "/manageaccount" },
  ];

  return (
    <ul className="absolute right-1 rounded-md bg-slate-200 p-3 space-y-1">
      {links.map((link) => (
        <li className="bg-slate-300 rounded-md">
          <Link to={link.url}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default ProfileDropdownMenu;
