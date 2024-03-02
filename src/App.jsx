import React from 'react';
import { Routes, Route, useLocation } from 'react-router'; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Player from "./pages/Player";
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/player"; 
  return (
    <>
    <AuthContextProvider>
    {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute>} />
        <Route path="/player" element={<ProtectedRoute><Player/></ProtectedRoute>} />
      </Routes>
    </AuthContextProvider>
    </>
  );
};

export default App;
