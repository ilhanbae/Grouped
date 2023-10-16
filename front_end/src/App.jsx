import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ManageAccount from "./pages/ManageAccount/ManageAccount";
import Header from "./components/Header/Header";
import Land from "./pages/Land/Land";
import IndividualCalendar from "./pages/IndividualCalendar/IndividualCalendar";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import CalendarHeader from "./components/Header/CalendarHeader";
import "./index.css";

export default function App() {
  const loc = useLocation();
  const noHeaderPaths = ["/", "/login", "/signup"];
  const isHeaderVisible = !noHeaderPaths.includes(loc.pathname);
  const isIndividualCalendar = loc.pathname === "/individualCalendar";
  return (
    <div className="flex flex-col h-screen">
      {/* Conditionally render a Header component */}
      {isHeaderVisible && (isIndividualCalendar ? <CalendarHeader /> : <Header />)}
      {/* Main Content */}
      <div className="h-full [&>div]:min-h-full">
        <Routes>
          <Route path="/" element={<Land />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/manageaccount" element={<ManageAccount />} />
          <Route path="/individualCalendar" element={<IndividualCalendar />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          {/* Add a catch-all route */}
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}