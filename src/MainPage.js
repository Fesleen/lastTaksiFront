import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MainPage.module.css';

const MainPage = () => {
    const navigate = useNavigate();
    const { telegram_id } = useParams();
    const [balance, setBalance] = useState(0);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!telegram_id) {
                navigate('/'); // Redirect to login if no telegram_id
                return;
            }

            try {
                const response = await axios.get('https://taksibot.pythonanywhere.com/users/profiles/');
                const userData = response.data;
                const loggedInUser = userData.find(user => user.telegram_id === telegram_id);

                if (loggedInUser) {
                    setBalance(loggedInUser.balance);
                    setUser(loggedInUser);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoggedIn(false);
            }
        };

        fetchUserData();
    }, [telegram_id, navigate]);

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

    if (!isLoggedIn) {
        return (
            <div className={styles.container}>
                <div className={styles.contactMessage}>
                    <p>Logindan o'tmagan bo'lsangiz, +998905440000 ga aloqaga chiqing</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.userInfo}>
                {user ? (
                    <span>{user.first_name} {user.last_name}</span>
                ) : (
                    <span>Loading user info...</span>
                )}
            </div>
            <div className={styles.balance}>
                <span>Balance: {balance}</span>
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
