import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ManageAccount from "./pages/ManageAccount/ManageAccount";
import Header from "./components/Header/Header";
import "./index.css";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="h-full [&>div]:min-h-full">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/manageaccount" element={<ManageAccount />} />
        </Routes>
      </div>
    </div>
  );
}
