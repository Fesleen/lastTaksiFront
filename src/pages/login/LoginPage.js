// src/LoginPage.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './LoginPage.css';

const CircularProgressWithLabel = (props) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

const LoginPage = () => {
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setProgress(10);

        const interval = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 90 ? 90 : prevProgress + 10));
        }, 200); // Progressni tezroq yangilash

        try {
            const response = await fetch('https://taxibuxoro.pythonanywhere.com/users/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: number, password }),
            });

            const result = await response.json();
            clearInterval(interval);
            setLoading(false);
            setProgress(100); // Progressni 100% ga yetkazish

            if (response.ok) {
                setTimeout(() => {
                    navigate('/main'); // Muvaffaqiyatli login bo'lganda asosiy sahifaga o'tish
                }, 10); // 1 soniya kutish
            } else {
                setErrorMessage(result.message || 'Login muvaffaqiyatsiz. Iltimos, qayta urinib ko\'ring.');
            }
        } catch (error) {
            console.error('Error:', error);
            clearInterval(interval);
            setLoading(false);
            setProgress(100); // Progressni 100% ga yetkazish
            setErrorMessage('Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
        }
    };

    return (
        <div className="container">
            {loading ? (
                <div className="loading-container">
                    <CircularProgressWithLabel value={progress} />
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h1>Farovon taksining haydovchilar bo'limiga <br /> XUSH KELIBSIZ!</h1>
                    <div className="inputGroup">
                        <label htmlFor="number">Telefon raqam:</label>
                        <input
                            className="input"
                            type="text"
                            id="number"
                            placeholder='Telefon raqamingizni kiriting'
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="password">Parol:</label>
                        <input
                            className='input'
                            type="password"
                            id="password"
                            placeholder='Parolingizni kiriting'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <p className="register-link">Agar ro'yhatdan o'tmagan bo'lsangiz, <Link to="/register">Ro'yhatdan o'ting</Link>.</p>
                    <button type="submit" disabled={loading}>
                        Kirish
                    </button>
                </form>
            )}
        </div>
    );
};

export default LoginPage;