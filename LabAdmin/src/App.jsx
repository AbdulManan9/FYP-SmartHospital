import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Pages
import Tests from './pages/Tests/Tests.jsx';
import PendingTests from './pages/PendingTests/PendingTests.jsx';
import Login from './pages/Login/Login.jsx';

// PrivateRoute HOC
const PrivateRoute = ({ element }) => {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Box>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={<PrivateRoute element={<Tests />} />}
          />
          <Route
            path="/pending-tests"
            element={<PrivateRoute element={<PendingTests />} />}
          />

          {/* Catch-all: redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;