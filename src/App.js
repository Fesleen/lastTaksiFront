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
            <div className="container">
                <AppContent isLoggedIn={isLoggedIn} />
            </div>
        </Router>
    );
};

const AppContent = ({ isLoggedIn }) => {
    const location = useLocation();
    const isMainPage = location.pathname === '/main';

    return (
        <>
            {!isMainPage && (
                <div>
                    <div className="logo">
                        <img src="/public/fvlogo.png" alt="Logo" /> {/* Replace with your logo image path */}
                    </div>
                    {!isLoggedIn && (
                        <nav className="nav">
                            <Link to="/login">Kirish</Link>
                            <Link to="/register">Ro'yhatdan o'tish</Link>
                        </nav>
                    )}
                </div>
            )}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationForm />} />
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Navigate to="/main" />} />
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/form" element={<FormPageWithBack />} />
                        <Route path="/form-mail" element={<FormMailPageWithBack />} />
                        <Route path="/search" element={<SearchPageWithBack />} />
                        <Route path="/search2" element={<Search2PageWithBack />} />
                    </>
                ) : (
                    <Route path="/" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </>
    );
};

const withBackButton = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        return (
            <div>
                <button onClick={() => navigate(-1)} className="back-button">Orqaga</button>
                <Component {...props} />
            </div>
        );
    };
};

const FormPageWithBack = withBackButton(FormPage);
const FormMailPageWithBack = withBackButton(FormMailPage);
const SearchPageWithBack = withBackButton(SearchPage);
const Search2PageWithBack = withBackButton(Search2Page);

export default App;
