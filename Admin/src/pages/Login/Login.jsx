// import React, { useState } from 'react'
// import './Login.css'
// import { assets } from '../../assets/assets'
// import axios from 'axios';
// const Login = () => {
//     const[username,setusername]=useState("");
//     const[password,setPassword]=useState("");
//     const url="http://localhost:4000/api/admin/Login";
    
//     const handleLogin=async(e)=>{
//       e.preventDefault();
//       try{
//         const response= await axios.post(`${url}`,{
//           username,
//           password,
//         });
//         if(response.data.success === true){
//           alert(response.data.message)
//         }
//         else{
//           alert(`${response.data.message} `)
//         }
//       }
//       catch(error){
//         alert("Error in api integration");
//       }

//     }
//   return (
//     <div className='login-form-main-div'>
//       <div className='login-form-div'>
//         <div className='login-innerfrom-img-div'>
//             <img className='login-form-logo'  src={assets.logo}/>
//             <p>Health care</p>
//         </div>
//         <div className='login-form'>
//             <form onSubmit={handleLogin}>
//                 <input value={username} onChange={(e)=>setusername(e.target.value)} type='text' placeholder='Username'/>
//                 <input value={password} onChange={(e)=> setPassword(e.target.value)} type='password' placeholder='Password'/>
//                 <div className='login-btn-div'>
//                     <button type='submit' className='login-form-button'>
//                         Login
//                     </button>
                    
                    
//                 </div>
//             </form>
//         </div>
//       </div>
//       <div className='login-from-img-div'></div>
//     </div>
//   )
// }

// export default Login



// import React, { useState } from 'react';
// import './Login.css';
// import { assets } from '../../assets/assets';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const url = "http://localhost:4000/api/admin/Login";

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(url, {
//                 username,
//                 password,
//             });

//             if (response.data.success) {
//                 toast.success(response.data.message, { position: "top-right" });
//             } else {
//                 toast.error(response.data.message, { position: "top-right" });
//             }
//         } catch (error) {
//             toast.error("Error in API integration", { position: "top-right" });
//             console.error("API Error:", error);
//         }
//     };

//     return (
//         <div className='login-form-main-div'>
//             <div className='login-form-div'>
//                 <div className='login-innerfrom-img-div'>
//                     <img className='login-form-logo' src={assets.logo} alt="Logo" />
//                     <p>Health care</p>
//                 </div>
//                 <div className='login-form'>
//                     <form onSubmit={handleLogin}>
//                         <input
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             type='text'
//                             placeholder='Username'
//                         />
//                         <input
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             type='password'
//                             placeholder='Password'
//                         />
//                         <div className='login-btn-div'>
//                             <button type='submit' className='login-form-button'>
//                                 Login
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             <div className='login-from-img-div'></div>

//             {/* Toastify container to show notifications */}
//             <ToastContainer />
//         </div>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook for navigation
    const url = "http://localhost:4000/api/admin/Login";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url, { username, password });

            if (response.data.success) {
                // Store token in localStorage
                localStorage.setItem("token", response.data.token);
                toast.success(response.data.message, { position: "top-right" });
                
                // Redirect to home page
                navigate("/");
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
                    <img className='loginn-form-logo' src={assets.logo} alt="Logo" />
                </div>
                <div className='login-form'>
                    <form onSubmit={handleLogin}>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type='text'
                            placeholder='Username'
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
            <ToastContainer />
        </div>
    );
};

export default Login;
