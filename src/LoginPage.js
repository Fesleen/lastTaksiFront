import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import your CSS file for styling

const LoginPage = () => {
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New loading state
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true); // Set loading state to true
        
        try {
            const response = await fetch('https://taksibot.pythonanywhere.com/users/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: number, password }),
            });

            const result = await response.json();
            if (response.ok) {
                // Assuming the response contains a field for telegramId or similar identifier
                const { telegram_id } = result; // Adjust this field based on your actual response
                navigate(`/main/${telegram_id}`); // Redirect to MainPage with telegram_id
            } else {
                setErrorMessage(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state
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
                <button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <div className="spinner"></div>
                            Kirish...
                        </>
                    ) : (
                        'Kirish'
                    )}
                </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default LoginPage;
