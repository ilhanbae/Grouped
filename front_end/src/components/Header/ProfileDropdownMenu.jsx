import React, { useState, useRef, useEffect } from "react";
import ProfileIcon from "./ProfileIcon";
import DropdownLinks from "./DropdownLinks";

const ProfileDropdownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropDownMenu = useRef(null);

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

  /* This hook checks if mousedown DOM event occurs outside the dropdown menu. */
  useEffect(() => {
    const outSideClickHandler = (event) => {
      if (
        dropDownMenu.current &&
        !dropDownMenu.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", outSideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outSideClickHandler);
    };
  });

  return (
    <div ref={dropDownMenu}>
      <ProfileIcon userInitial={userInitial} toggleMenu={toggleMenu} />
      {isMenuOpen && <DropdownLinks toggleMenu={toggleMenu} />}
    </div>
  );
};

export default ProfileDropdownMenu;
