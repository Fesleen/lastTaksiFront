import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from './style.module.css';
import { useTheme } from '../../theme';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const { isBlue } = useTheme();
    const navigate = useNavigate();
    const fileInputRef = useRef(null); // Fayl inputini boshqarish uchun ref

    const fetchUserData = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token not found');
            navigate('/login');
            return;
        }
        try {
            const response = await axios.get('https://taxibuxoro.pythonanywhere.com/users/profile/', {
                headers: {
                    'Authorization': `JWT ${accessToken}`,
                },
            });
            setUserData(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [navigate]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            const accessToken = localStorage.getItem('accessToken');
            const formData = new FormData();
            formData.append('passport_photo', file);

            try {
                await axios.post('https://taxibuxoro.pythonanywhere.com/users/profile/', formData, {
                    headers: {
                        'Authorization': `JWT ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('Rasm muvaffaqiyatli yangilandi!');
                fetchUserData(); // Foydalanuvchi ma'lumotlarini yangilang
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Rasmni yangilashda xato!');
            }
        }
    };

    const handleEditButtonClick = () => {
        fileInputRef.current.click(); // Fayl inputini ochish
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={isBlue ? styles.containerBlue : styles.containerWhite}>
            <div className={styles.userCard}>
                <h1 className={isBlue ? styles.titleBlue : styles.titleWhite}>User  Profile</h1>
                <div className={styles.userInfo}>
                    <div className={styles.profileImage}>
                        <img 
                            src={`https://taxibuxoro.pythonanywhere.com${userData.passport_photo}`} 
                            alt="Passport" 
                            className={styles.profileImages} 
                        />
                        <button className={styles.editIcon} onClick={handleEditButtonClick}>
                            <EditIcon />
                        </button>
                    </div>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} // Ko'rinmas qilib qo'yish
                    />
                    <p className={isBlue ? styles.pBlue : styles.pWhite}><strong>Buyurtmachi:</strong> {userData.first_name} {userData.last_name}</p>
                    <p className={isBlue ? styles.pBlue : styles.pWhite}><strong>Phone:</strong> {userData.phone_number}</p>
                    <p className={isBlue ? styles.pBlue : styles.pWhite}><strong>Orders :</strong> {userData.orders_count}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;