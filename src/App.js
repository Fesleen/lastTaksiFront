import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import RegistrationForm from './pages/registration/RegistrationForm';
import FormPage from './components/MainPage/FormPage';
import FormMailPage from './components/MainPage/FormMailPage';
import SearchPage from './components/MainPage/SearchPage';
import Search2Page from './components/MainPage/Search2Page';
import MainPage from './components/MainPage/MainPage'; 
import './App.css'; 
import FormPage2 from './components/MainPage/formpage2';
import FormPagePochta from './components/MainPage/formailPage';
import { ThemeProvider } from './components/theme'; // Mavzu ta'minlovchi import qiling
import FormPage3 from './components/MainPage/formPage3';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Local storage'dan tokenni olish
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true); // Agar token mavjud bo'lsa, foydalanuvchi tizimga kirgan deb hisoblaymiz
        }
    }, []);

    return (
        <Router>
            <ThemeProvider>
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
                            <Route path="/form2" element={<FormPage2 />} />
                            <Route path="/form3" element={<FormPage3 />} />
                            <Route path="/pochta" element={<FormPagePochta />} />
                        </>
                    ) : (
                        <Route path="/" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            </ThemeProvider>
        </Router>
    );
};

export default App;