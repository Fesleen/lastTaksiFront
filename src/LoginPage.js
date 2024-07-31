// src/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://taksibot.pythonanywhere.com/users/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: number, password }),
            });

            const result = await response.json();
            if (response.ok) {
                const { access, refresh, user } = result; 
                console.log('Tokens:', access, refresh); // Debug token output
                localStorage.setItem('accessToken', access);
                localStorage.setItem('refreshToken', refresh);
                navigate('/main', { state: { user } });
            } else {
                setErrorMessage(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h1>Farovon taksining haydovchilar bo'limiga <br /> HUSH KELIBSIZ!</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="number">Telefon raqam:</label>
                <input
                    type="text"
                    id="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />
                <label htmlFor="password">Parol:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Kirish</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default LoginPage;
