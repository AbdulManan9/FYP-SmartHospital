
import React, { useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Typography } from '@mui/material';

const Login = () => {
    const [currentState, setcurrentState] = useState('Login');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [data, setDate] = useState({
        name: "",
        email: "",
        password: "",
    })


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDate(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        let url;
        event.preventDefault();
        if (currentState == 'Login') {
            url = "http://localhost:4000/api/user/login";

        }
        else {
            url = "http://localhost:4000/api/user/register";
        }
        try {
            const response = await axios.post(url, data);
            if (response.data.success == true) {
                console.log("Api true");
                localStorage.setItem("token", response.data.token);
                navigate('/');

            }
            else {
                alert(response.data.message)
                console.log("False");
                setError(response.data.message);
            }
        }
        catch (error) {
            console.log("Error in api integration");
            console.log(error);

            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    }
    return (
        <div className='login-form-main-div'>
            <div className='login-form-div'>
                <div className='login-innerfrom-img-div'>
                    <img className='loginn-form-logo' src={assets.Logo} alt="Logo" />

                </div>
                <div className='login-innerfrom-img-div'>
                    <h2 className='login-heading'>{currentState}</h2>
                </div>
                <div className='login-form'>
                    <form onSubmit={onLogin}>
                        {currentState == "Login" ? <></> :
                            <input
                                name='name'
                                value={data.name}
                                onChange={onChangeHandler}
                                type='text'
                                placeholder='Enter Name'
                            />}

                        <input
                            name='email'
                            value={data.email}
                            onChange={onChangeHandler}
                            type='text'
                            placeholder='Email'
                        />
                        <input
                            name='password'
                            value={data.password}
                            onChange={onChangeHandler}
                            type='password'
                            placeholder='Password'
                        />
                        <br />

                        <Typography sx={{ color: 'red' }}>{error}</Typography>
                        <div>
                            {/* <Link to='/ForgetPassword'>Forget Password?</Link> */}
                        </div>
                        <div className='login-btn-div'>
                            <button type='submit' className='login-form-button'>
                                {currentState == "Login" ? "Login" : "Create Account"}
                            </button>

                        </div>
                        <div>

                            {
                                currentState == "Login"
                                    ? <p className='login-option'> Create a new Account? <span onClick={() => setcurrentState("SignUp")}>Click here</span></p>
                                    : <p className='login-option'>Already have an Account? <span onClick={() => setcurrentState("Login")}> Login here</span></p>
                            }


                        </div>
                    </form>
                </div>
            </div>
            <div className='login-from-img-div'></div>
            <ToastContainer />
        </div>
    );
};

export default Login;
