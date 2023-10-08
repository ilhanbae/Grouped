import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
        };

        try {
            // Send POST request to server endpoint
            const response = await axios.post('/your-auth-endpoint', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response === 200) {
                console.log('Login successful');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        //TODO: for now, to establish connections, this page will lead you to the calendar view page
        window.location.href = "http://localhost:3000/individualCalendar";
    };


    return (
        <div style={{ backgroundColor: 'lightgrey' }}>
            <div className="text-white flex flex-col justify-center items-center">
                <h1 className="text-6xl text-black font-bold text-center p-8">Login to Your Account</h1>
                <br />
                <div className="flex flex-col items-center">
                    <div className="bg-slate-800 border border-slate-800 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative" style={{ backgroundColor: 'lightskyblue' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="relative my-4">
                                <input type="email" className="block w-96 py-4 px-4 text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <label htmlFor="" className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -x-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
                                <BiUser className="absolute top-4 right-4" />
                            </div>
                            <div className="relative my-4">
                                <input type="password" className="block w-96 py-4 px-4 text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-black focus:border-blue-600 peer" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <label htmlFor="" className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -x-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Password</label>
                                <AiOutlineUnlock className="absolute top-4 right-4" />
                            </div>
                            <button className="w-full mb-4 text-[25px] mt-6 rounded-full bg-yellow-500 text-black font-bold hover:bg-yellow-600 hover:text-white py-2 transition-colors duration-300" type="submit">Sign In</button>
                        </form>
                    </div>
                    <div className='p-8' style={{marginTop:'20px'}}>
                        <span className='m-12'><Link className="text-blue-500 text-3xl font-bold" to="/signup">Don't have an Account?</Link></span>
                        <span className='m-12'><Link className="text-blue-500 text-3xl font-bold" to="ForgotPassword">Forgot Password?</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;