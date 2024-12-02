import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './MainPage.module.css';
import { useTheme } from '../theme';
import PersonIcon from '@mui/icons-material/Person';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HouseIcon from '@mui/icons-material/House';
import ListIcon from '@mui/icons-material/List';

const MainPage = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { isBlue, toggleTheme } = useTheme();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const accessToken = localStorage.getItem('accessToken');

                if (!accessToken) {
                    navigate('/login');
                    return;
                }

                if (isAccessTokenExpired(accessToken)) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('https://taxibuxoro.pythonanywhere.com/users/profile/', {
                    headers: {
                        'Authorization': `JWT ${accessToken}`,
                    },
                });

                const userData = response.data;
                setFirstName(userData.first_name || '');
                setLastName(userData.last_name || '');
                setBalance(userData.balance || 0);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const isAccessTokenExpired = (token) => {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        return exp < Math.floor(Date.now() / 1000);
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <h2 className={isBlue ? styles.loadingBlue : styles.loadingWhite}>loading</h2>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.Buttonsgroup}>
                <p className={isBlue ? styles.textOnBlueP : styles.textOnWhiteP}>Farovon Yo'l</p>
                <button onClick={toggleTheme} className={styles.buttonTop}>
                    <BedtimeIcon />
                </button>
                <button className={styles.buttonTop} onClick={() => navigate('/profile')}>
                    <PersonIcon />
                </button>
            </div>
            <div className={isBlue ? styles.backgroundBlue : styles.backgroundWhite}>
                <h2 className={isBlue ? styles.textOnBlue : styles.textOnWhite}>
                    Salom, <span className={isBlue ? styles.textOnBlueP : styles.textOnWhiteP}>{firstName} {lastName}</span>
                </h2>
                <h3 className={isBlue ? styles.textOnBlue : styles.textOnWhite}>
                    Hisobingiz: {balance} so'm
                </h3>
                <div className={isBlue ? styles.Buttonscomponent2 : styles.Buttonscomponent}>
                    <div className={styles.buttoncomponentitem}>
                        <button className={styles.button} onClick={() => navigate('/form')}>
                            <PersonAddIcon sx={{ fontSize: 30 }} />
                            <h1 className={styles.h1}>Yo'lovchi olish</h1>
                        </button>
                        <button className={styles.button1} onClick={() => navigate('/form-mail')}>
                            <PeopleAltIcon sx={{ fontSize: 30 }} />
                            <h1 className={styles.h1}>Yo'lovchi berish</h1>
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.containerBottom}>
                <div className={isBlue ? styles.ButtonBottom : styles.ButtonBottom2}>
                    <div className={styles.ButtonBottomitem}>
                        <button onClick={() => navigate('/')}><HouseIcon /></button>
                        <span className={isBlue ? styles.textOnBluespan : styles.textOnWhitespan}>Asosiy</span>
                    </div>
                    <div className={styles.ButtonBottomitem}>
                        <button onClick={() => navigate('/order')}><ListIcon /></button>
                        <span className={isBlue ? styles.textOnBluespan : styles.textOnWhitespan}>Buyurtmalar</span>
                    </div>
                    <div className={styles.ButtonBottomitem}>
                        <button onClick={() => navigate('/profile')}><PersonIcon /></button>
                        <span className={isBlue ? styles.textOnBluespan : styles.textOnWhitespan}>Profil</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;