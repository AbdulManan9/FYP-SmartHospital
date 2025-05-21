// import React from 'react'
// import Navbar from './componend/Navbar/Navbar'
// // import Sidebar from './componend/Sidebar/Sidebar'
// import { Routes, BrowserRouter, Route } from 'react-router-dom';
// import ManageDoctor from './pages/ManageDoctor/ManageDoctor';
// import Login from './pages/Login/Login';
// import ManageDashboard from './pages/ManageDashboard/ManageDashboard';
// import ManageNurses from './pages/ManageNurses/ManageNurses';
// import ManageWard from './pages/ManageWard/ManageWard';
// import Rooms from './pages/Rooms/Rooms';
// const App = () => {
//   return (
    
//     <BrowserRouter>
//     <div>
//       {/* <Navbar/> */}
//       <hr/>
      
//       <Routes>  
//         <Route path='/manageDoctor' element={<ManageDoctor/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/' element={<ManageDashboard/>}/>
//         <Route path='/manageNurse' element={<ManageNurses/>}/>
//         <Route path='/manageWard' element={<ManageWard/>}/>
//         <Route path='/Rooms' element={<Rooms/>}/>
//       </Routes>
//     </div>
//     </BrowserRouter>
    
//   )
// }

// export default App




import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import ManageDoctor from "./pages/ManageDoctor/ManageDoctor";
import Login from "./pages/Login/Login";
import ManageDashboard from "./pages/ManageDashboard/ManageDashboard";
import ManageNurses from "./pages/ManageNurses/ManageNurses";
import ManageWard from "./pages/ManageWard/ManageWard";
import Rooms from "./pages/Rooms/Rooms";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ManageWardAdmanistator from "./pages/ManageWardAdmanistator/ManageWardAdmanistator";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<ManageDashboard />} />} />
          <Route path="/manageDoctor" element={<PrivateRoute element={<ManageDoctor />} />} />
          <Route path="/manageNurse" element={<PrivateRoute element={<ManageNurses />} />} />
          <Route path="/manageWard" element={<PrivateRoute element={<ManageWard />} />} />
          <Route path="/Rooms" element={<PrivateRoute element={<Rooms />} />} />
          <Route path="/WardAdmanistator" element={<PrivateRoute element={<ManageWardAdmanistator />} />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
