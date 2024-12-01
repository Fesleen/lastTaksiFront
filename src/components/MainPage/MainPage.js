import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import styles from './MainPage.module.css'; 
import { useTheme } from '../theme'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import HouseIcon from '@mui/icons-material/House';
import ListIcon from '@mui/icons-material/List';

const MainPage = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { isBlue, toggleTheme } = useTheme(); 
    const [loading, setLoading] = useState(true); // Loading holatini qo'shish

    useEffect(() => {
        toggleTheme();
    }, []); 

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true); // Ma'lumotlarni yuklashdan oldin loadingni o'rnatamiz
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) throw new Error('No access token found');
                const response = await axios.get('https://taxibuxoro.pythonanywhere.com/users/profile/', {
                    headers: {
                        'Authorization': `JWT ${accessToken}`, // JWT o'rniga 
                    },
                });

                const userData = response.data;
                setFirstName(userData.first_name || '');
                setLastName(userData.last_name || '');
                setBalance(userData.balance || 0);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login'); 
                }
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Ma'lumotlar yuklangandan so'ng loadingni o'chirish
            }
        };

        fetchUserData(); 
    }, [navigate]);

    const handleButtonClick = (path) => {
        navigate(path);
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <h2 className={isBlue ? styles.loadingBlue : styles.loadingWhite}>.</h2> {/* Loading indikatorini ko'rsatish */}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.container}>
                <div className={styles.Buttonsgroup}>
                    <p className={isBlue ? styles.textOnBlueP : styles.textOnWhiteP}>Farovon Yo'l</p>
                    <button onClick={toggleTheme} className={styles.buttonTop}>
                        <BedtimeIcon />
                    </button>
                    <button className={styles.buttonTop} onClick={() => handleButtonClick('/profile')}>
                        <PersonIcon />
                    </button>
                </div>
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
                        <button className={styles.button} onClick={() => handleButtonClick('/form')}>
                            <PersonAddIcon sx={{ fontSize: 30 }} />
                            <h1 className={styles.h1}>Yo'lovchi olish</h1>
                        </button>
                        <button className={styles.button1} onClick={() => handleButtonClick('/form-mail')}>
                            <PeopleAltIcon sx={{ fontSize: 30 }} />
                            <h1 className={styles.h1}>Yo'lovchi berish</h1>
                        </button>
                    </div>
                </div>
            </div>
            <div className ={styles.containerBottom}>
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