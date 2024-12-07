import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './FormMailPage.module.css';
import CommonComponent from '../main_top';
import { useTheme } from '../theme';
import axios from 'axios';

const FormMailPage = () => {
    const { isBlue } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const requestType = params.get('type') || 'yolovchi_berish';
    const [formData, setFormData] = useState({
        request_type: requestType,
        request: '', // So'rov ID sini saqlash uchun
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // API ga yuboriladigan ma'lumotlar
        const dataToSend = {
            request: parseInt(formData.request), // Request ID, integer formatida
            getrequest_type: formData.request_type, // So'rov turini olish
        };

        console.log('Yuborilayotgan ma\'lumotlar:', dataToSend);

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            alert('Autentifikatsiya xatosi. Iltimos, qayta kirish qiling.');
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post(
                'https://taxibuxoro.pythonanywhere.com/getrequests/',
                dataToSend,
                {
                    headers: {
                        'Authorization': `JWT ${accessToken}`, // O'z tokeningizni qo'shing
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert(`So'rov muvaffaqiyatli yuborildi, adminlar ko'rib chiqib siz bilan aloqaga chiqishadi!`);
            navigate('/'); // Muvaffaqiyatli yuborilgandan so'ng boshqa sahifaga o'tish

        } catch (error) {
            console.error('So\'rovni yuborishda xatolik:', error);
            alert('Xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
        }
    };

    return (
        <>
            <CommonComponent />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>So'rov turini tanlang:</label>
                    <select
                        className={isBlue ? styles.selectBlue : styles.selectWhite}
                        name="request_type"
                        value={formData.request_type}
                        onChange={handleChange}
                    >
                        <option value="yolovchi_berish">Yo'lovchi berish</option>
                        <option value="pochta_berish">Pochta berish</option>
                    </select>
                    <input
                        type="number" // Integer formatida kiritish uchun
                        name="request"
                        placeholder="So'rov ID"
                        value={formData.request}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.buttoncomponent}>
                        <button type="button" className={styles.submitButton} onClick={() => navigate(-1)}> Orqaga </button>
                        <button type="submit" className={styles.submitButton}>Yuborish</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormMailPage;