import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './MainPage.module.css';

const MainPage = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // Ensure phoneNumber state is initialized

    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                console.log('Access Token:', accessToken);


                if (!accessToken) {
                    throw new Error('No access token found');
                }

                const response = await axios.get('https://taksibot.pythonanywhere.com/users/profile/', {
                    headers: {
                        'Authorization': `JWT ${accessToken}`,
                    },
                });

                const userData = response.data;
                console.log(userData); // Log the response to check if phone_number is present

                if (userData) {
                    setPhoneNumber(userData.phone_number || '');  // Check if phone_number exists
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
                if (balance < 5000) {
                    alert('Balansni to\'ldiring');
                    return;
                }
                route = '/search2';
                break;
            case 'Give a passenger':
                route = '/form';
                break;
            case 'Get a passenger':
                if (balance < 7500) {
                    alert('Balansni to\'ldiring');
                    return;
                }
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
                <h2 className={styles.phoneNumber}>Telefon raqam: {phoneNumber || 'No phone number available'}</h2>
                <h3 className={styles.balance}>Hisob: {balance}</h3>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => handleButtonClick('Give a passenger')}>Yo'lovchi berish</button>
                <button className={styles.button} onClick={() => handleButtonClick('Get a passenger')}>Yo'lovchi olish</button>
                <button className={styles.button} onClick={() => handleButtonClick('Give mail')}>Pochta berish</button>
                <button className={styles.button} onClick={() => handleButtonClick('Get mail')}>Pochta olish</button>
            </div>
        </div>
    );
};

export default MainPage;
