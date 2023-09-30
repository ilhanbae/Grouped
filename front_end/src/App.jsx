import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Profile } from './pages/Profile/Profile';
import { EditProfile } from "./pages/EditProfile/EditProfile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import './index.css';

export default function App() {
    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/editprofile" element={<EditProfile />} />
            </Routes>
        </div>
    );
}