// LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p className="register-link">
                    Agar ro'yhatdan o'tmagan bo'lsangiz, <Link to="/register">Ro'yhatdan o'ting</Link>.
                </p>
                <button type="submit" disabled={loading}>
                    {loading ? <div className="spinner"></div> : 'Kirish'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
