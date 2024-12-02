// LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); // Eslab qolish holati
    const navigate = useNavigate();

    // Sahna yuklanganda, agar ma'lumotlar mavjud bo'lsa, ularni o'rnatish
    useEffect(() => {
        const savedNumber = localStorage.getItem('savedNumber');
        const savedPassword = localStorage.getItem('savedPassword');

        if (savedNumber) {
            setNumber(savedNumber);
        }
        if (savedPassword) {
            setPassword(savedPassword);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://taxibuxoro.pythonanywhere.com/users/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: number, password }),
            });

            const result = await response.json();
            setLoading(false);

            if (response.ok) {
                const { access, refresh, user } = result;

                // Tokenlarni localStorage-da saqlash
                localStorage.setItem('accessToken', access);
                localStorage.setItem('refreshToken', refresh);

                // Eslab qolish holati
                if (rememberMe) {
                    localStorage.setItem('savedNumber', number);
                    localStorage.setItem('savedPassword', password);
                } else {
                    localStorage.removeItem('savedNumber');
                    localStorage.removeItem('savedPassword');
                }

                // Muvaffaqiyatli login holatida asosiy sahifaga o'tkazish
                navigate('/main', { state: { user } });
            } else {
                setErrorMessage(result.detail || 'Login muvaffaqiyatsiz. Iltimos, qayta urinib ko‘ring.');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            setErrorMessage('Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Farovon taksining haydovchilar bo'limiga XUSH KELIBSIZ!</h1>
                <div className="inputGroup">
                    <label htmlFor="number">Telefon raqam:</label>
                    <input
                        className="input"
                        type="text"
                        id="number"
                        placeholder="Telefon raqamingizni kiriting"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        autoComplete="tel" // To'g'ri yozilish: autoComplete
                        required
                    />
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Parol:</label>
                    <input
                        className="input"
                        type="password"
                        id="password"
                        placeholder="Parolingizni kiriting"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password" // To'g'ri yozilish: autoComplete
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p className="register-link">
                    Agar ro'yhatdan o'tmagan bo'lsangiz, <Link to="/register">Ro'yhatdan o'ting</Link>.
                </p>
                <div className="checkbox-group">
                    <label htmlFor="remember-me" className="checkbox-label">Raqam va Parol eslab qolinsinmi?</label>
                    <input type="checkbox" id="remember-me" className="checkbox" />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? <div className="spinner"></div> : 'Kirish'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;