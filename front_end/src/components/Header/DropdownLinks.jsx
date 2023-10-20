import React from "react";
import { Link } from "react-router-dom";

const DropDownLinks = (props) => {
  const links = [
    { label: "Profile", url: "/profile" },
    { label: "Manage Account", url: "/manageaccount" },
  ];

  return (
    <ul className="absolute right-1 rounded-md bg-slate-200 p-1 z-10 border-2 border-white">
      <li className="flex flex-col p-2 m-1 border-b-2 border-slate-700">
        <span className="font-bold">{sessionStorage.getItem("username")}</span>
        <span className="">{sessionStorage.getItem("email")}</span>
      </li>
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