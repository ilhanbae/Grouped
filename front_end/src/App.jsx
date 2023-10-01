import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import Login from "./pages/Login/Login";
import ManageAccount from "./pages/ManageAccount/ManageAccount";
import "./index.css";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/manageaccount" element={<ManageAccount />} />
      </Routes>
    </div>
  );
}
