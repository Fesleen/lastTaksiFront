// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegistrationForm from './RegistrationForm';
import MainPage from './components/MainPage/MainPage';
import FormPage from './components/MainPage/FormPage';
import FormMailPage from './components/MainPage/FormMailPage';
import SearchPage from './components/MainPage/SearchPage';
import Search2Page from './components/MainPage/Search2Page';
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
                    <Route path="/main" element={<MainPage />} />
                </Routes>
            </div>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/form" element={<FormPage />} />
                <Route path="/form-mail" element={<FormMailPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/search2" element={<Search2Page />} />
            </Routes>
        </Router>
        
    );
};

export default App;
