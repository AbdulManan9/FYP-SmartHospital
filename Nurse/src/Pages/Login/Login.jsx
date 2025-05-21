
import React, { useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook for navigation
    const url = "http://localhost:4000/api/nurse/login";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url, { Email, password });

            if (response.data.success==true) {
                // Store token in localStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("dutyWard", response.data.data.dutyWard);
                localStorage.setItem('id',response.data.data._id);
               
                
                // Redirect to home page
                navigate("/");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Error in api integration");
            console.error("API Error:", error);
        }
    };

    return (
        <div className='login-form-main-div'>
            <div className='login-form-div'>
                <div className='login-innerfrom-img-div'>
                    <img className='loginn-form-logo' src={assets.Logo} alt="Logo" />
                </div>
                <div className='login-form'>
                    <form onSubmit={handleLogin}>
                        <input
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='text'
                            placeholder='Email'
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            placeholder='Password'
                        />
                        <br/>
                        <div>
                        {/* <Link to='/ForgetPassword'>Forget Password?</Link> */}
                        </div>
                        <div className='login-btn-div'>
                            <button type='submit' className='login-form-button'>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='login-from-img-div'></div>
            
        </div>
    );
};

export default Login;
