// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegistrationForm from './RegistrationForm';
import './App.css'; // Import the CSS file

const App = () => {
    return (
        <Router>
            <div className="container">
                <div className="logo">
                    <img src="/pulic/fvlogo.png" alt="Logo" /> {/* Replace with your logo image path */}
                </div>
                <nav className="nav">
                    <Link to="/login">Kirish</Link>
                    <Link to="/register">Ro'yhatdan o'tish</Link>
                </nav>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
