import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegistrationForm from './RegistrationForm';
import FormPage from './components/MainPage/FormPage';
import FormMailPage from './components/MainPage/FormMailPage';
import SearchPage from './components/MainPage/SearchPage';
import Search2Page from './components/MainPage/Search2Page';
import MainPage from './components/MainPage/MainPage'; // Make sure this path is correct

import './App.css'; // Import the CSS file

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <AppContent isLoggedIn={isLoggedIn} />
        </Router>
    );
};

const AppContent = ({ isLoggedIn }) => {
    const location = useLocation();
    const isMainPage = location.pathname === '/main';

    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationForm />} />
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Navigate to="/main" />} />
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/form" element={<FormPage />} />
                        <Route path="/form-mail" element={<FormMailPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/search2" element={<Search2Page />} />
                    </>
                ) : (
                    <Route path="/" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </>
    );
};


export default App;
