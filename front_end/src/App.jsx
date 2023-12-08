import React from "react";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ManageAccount from "./pages/ManageAccount/ManageAccount";
import Header from "./components/Header/Header";
import Land from "./pages/Land/Land";
import IndividualCalendar from "./pages/IndividualCalendar/IndividualCalendar";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import "./index.css";

export default function App() {
  const loc = useLocation();
  const noHeaderPaths = ["/", "/login", "/signup"];
  const isHeaderVisible = !noHeaderPaths.includes(loc.pathname);
  const isIndividualCalendar = loc.pathname === "/individualCalendar";

  const navigate = useNavigate();

  // Detect manual session storage change and fall back to login page.
  // Also detect session storage delete and fall back to login page.
  window.addEventListener("storage", (event) => {
    if (event.oldValue) {
      sessionStorage.clear();
      navigate("/login");
    }

    if (
      !sessionStorage.getItem("id") ||
      !sessionStorage.getItem("username") ||
      !sessionStorage.getItem("email") ||
      !sessionStorage.getItem("token")
    ) {
      sessionStorage.clear();
      navigate("/login");
    }
  });

  return (
    <div className="flex flex-col h-screen bg-slate-300">
      {/* Conditionally render a Header component */}
      {isHeaderVisible && <Header />}
      {/* Main Content */}
      <div className="h-full [&>div]:min-h-full bg-slate-300">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Land />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/manageaccount" element={<ManageAccount />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route
              path="/individualCalendar"
              element={<IndividualCalendar />}
            />
          </Route>
          {/* Add a catch-all route */}
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}