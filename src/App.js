import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import RegistrationForm from './pages/registration/RegistrationForm';
import FormPage from './components/MainPage/FormPage';
import FormMailPage from './components/MainPage/FormMailPage';
import MainPage from './components/MainPage/MainPage'; 
import './App.css'; 
import FormPage2 from './components/MainPage/formpage2';
import { ThemeProvider } from './components/theme'; 
import FormPage3 from './components/MainPage/formPage3';
import ProfilePage from './components/MainPage/profile';
import OrdersPage from './components/MainPage/buyurtmalar';
import ReklamaPage from './components/MainPage/reklama';
import FormMailPage3 from './components/MainPage/formmail3';
import FormMailPage2 from './components/MainPage/formmail2page';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Tokenni to'g'ri kalit bilan olish
        const token = localStorage.getItem('accessToken'); // accessToken kalitini ishlatish
        if (token) {
            setIsLoggedIn(true); 
        }
    }, []);

    return (
        <Router>
            <ThemeProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/reklama" element={<ReklamaPage />} />
                    {isLoggedIn ? (
                        <>
                            <Route path="/" element={<Navigate to="/main" />} />
                            <Route path="/main" element={<MainPage />} />
                            <Route path="/form" element={<FormPage />} />
                            <Route path="/form-mail" element={<FormMailPage/>} />
                            <Route path="/form2" element={<FormPage2 />} />
                            <Route path="/formmail2" element={<FormMailPage2 />} />
                            <Route path="/formmail3" element={<FormMailPage3 />} />
                            <Route path="/form3" element={<FormPage3 />} />
                            <Route path='/profile' element={<ProfilePage/>}/>
                            <Route path="/order" element={<OrdersPage/>}/>
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