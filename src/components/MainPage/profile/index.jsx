import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './style.module.css';
import { useTheme } from '../../theme';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { isBlue, toggleTheme } = useTheme();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://dog.ceo/api/breeds/image/random'); // O'zingizning API URL'ni kiriting
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            await axios.post('/api/user/profile/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div  className={isBlue ? styles.containerBlue : styles.containerWhite}>
            <h1 className={isBlue ? styles.titleBlue : styles.titleWhite}>User  Profile</h1>
            <div className={styles.profileImage}>
                <img className={styles.profileImages} src={imagePreview || userData.image} alt="User " />
                <button className={isBlue ? styles.editIconBlue : styles.editIconWhite} onClick={() => document.getElementById('imageInput').click()}>
                    ✎
                </button>
                <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </div>
            <div className={styles.userInfo}>
                <h2 className={isBlue ? styles.h2Blue : styles.h2White}>User Information</h2>
                <p className={isBlue ? styles.pBlue : styles.pWhite}><strong className={isBlue ? styles.strongBlue : styles.strongWhite}>Name:</strong> {userData.name}</p>
                <p className={isBlue ? styles.pBlue : styles.pWhite}><strong className={isBlue ? styles.strongBlue : styles.strongWhite}>Surname:</strong> {userData.surname}</p>
                <p className={isBlue ? styles.pBlue : styles.pWhite}><strong className={isBlue ? styles.strongBlue : styles.strongWhite}>Phone:</strong> {userData.phone}</p>
                <p className={isBlue ? styles.pBlue : styles.pWhite}><strong className={isBlue ? styles.strongBlue : styles.strongWhite}>Orders Count:</strong> {userData.ordersCount}</p>
                <p className={isBlue ? styles.pBlue : styles.pWhite}><strong className={isBlue ? styles.strongBlue : styles.strongWhite}>Returned Orders Count:</strong> {userData.returnedOrdersCount}</p>
            </div>
        </div>
    );
};

export default ProfilePage;