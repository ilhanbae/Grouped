import React from "react";
import ProfileDropdownMenu from "./ProfileDropdownMenu";

const Header = () => {
  return (
    <nav className="flex min-w-full items-center justify-between p-3 bg-slate-700">
      <div>Logo</div>
      <ProfileDropdownMenu />
    </nav>
  );
};

export default Header;
