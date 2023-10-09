import React from "react";
import { Link } from "react-router-dom";

const DropDownLinks = (props) => {
  const links = [
    { label: "Profile", url: "/profile" },
    { label: "Manage Account", url: "/manageaccount" },
  ];

  return (
    <ul className="absolute right-1 rounded-md bg-slate-200 p-1">
      {links.map((link) => (
        <Link key={link.url} to={link.url} onClick={props.toggleMenu}>
          <li className="flex bg-slate-300 rounded-md p-2 m-1 hover:bg-slate-400">
            {link.label}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default DropDownLinks;