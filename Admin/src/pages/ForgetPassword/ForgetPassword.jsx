import React, { useState } from 'react';
import './ForgetPassword.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const ForgetPassword = () => {
    const [email, setemail] = useState("");
    const navigate = useNavigate(); // Hook for navigation
    const url = "http://localhost:4000/api/admin/ForgetPassword";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url, {email});

            if (response.data.success) {
                
                navigate("/login");
            } else {
                toast.error(response.data.message, { position: "top-right" });
            }
        } catch (error) {
            toast.error("Error in API integration", { position: "top-right" });
            console.error("API Error:", error);
        }
    };

    return (
        <div className='login-form-main-div'>
            <div className='login-form-div'>
                <div className='login-innerfrom-img-div'>
                    <img className='login-form-logo' src={assets.logo} alt="Logo" />
                    <p>Health care</p>
                </div>
                <div className='login-form'>
                    <form onSubmit={handleLogin}>
                        <input
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            type='text'
                            placeholder='Email'
                        />
                        <div className='login-btn-div'>
                            <button type='submit' className='login-form-button'>
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='login-from-img-div'></div>
            <ToastContainer />
        </div>
    );
};

export default ForgetPassword;
