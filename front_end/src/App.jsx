import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Profile } from './pages/Profile/Profile';
import { EditProfile } from "./pages/EditProfile/EditProfile";
import Login from "./pages/Login/Login";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='login' element={<Login/>}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/editprofile" element={<EditProfile />} />
            </Routes>
        </Router>
    );
}