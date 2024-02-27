import React from 'react';
import { Routes, Route } from 'react-router'; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute>} />
      </Routes>
    </AuthContextProvider>
    </>
  );
};

export default App;
