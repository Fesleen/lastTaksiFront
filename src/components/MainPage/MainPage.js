import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './MainPage.module.css';

const MainPage = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);

                if (!accessToken) {
                    throw new Error('No access token found');
                }

                const response = await axios.get('https://taksibot.pythonanywhere.com/users/profile/', {
                    headers: {
                        'Authorization': `JWT ${accessToken}`,
                    },
                });

                const userData = response.data;
                if (userData) {
                    setPhoneNumber(userData.phone_number || '');
                    setFirstName(userData.first_name || '');
                    setLastName(userData.last_name || '');
                    setBalance(userData.balance || 0);
                } else {
                    console.error('User data is undefined.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleButtonClick = (type) => {
        let route;
        switch (type) {
            case 'Give mail':
                route = '/form-mail';
                break;
            case 'Get mail':
                route = '/search2';
                break;
            case 'Give a passenger':
                route = '/form';
                break;
            case 'Get a passenger':
                route = '/search';
                break;
            default:
                route = '/';
        }
        navigate(route);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.userName}>{firstName} {lastName}</h1>
                <h2 className={styles.balance}>Hisob: {balance}</h2>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => handleButtonClick('Give a passenger')}>Give a passenger</button>
                <button className={styles.button} onClick={() => handleButtonClick('Get a passenger')}>Get a passenger</button>
                <button className={styles.button} onClick={() => handleButtonClick('Give mail')}>Give mail</button>
                <button className={styles.button} onClick={() => handleButtonClick('Get mail')}>Get mail</button>
            </div>
        </div>
    );
};

export default MainPage;
