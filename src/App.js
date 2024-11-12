import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
            {isMainPage && <div>This is the main page!</div>}

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
                        <Route path='/form2' element={<FormPage2/>}/>
                        <Route path='/pochta' element={<FormPagePochta/>}/>
                    </>
                ) : (
                    <Route path="/" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </>
    );
};

export default App;
