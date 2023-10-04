import React from "react";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import Logo from "./Logo";

const Header = () => {
  return (
    <nav className="flex min-w-full items-center justify-between p-3 bg-slate-700">
      <Logo />
      <ProfileDropdownMenu />
    </nav>
  );
};

export default Header;
