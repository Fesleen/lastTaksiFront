import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FormPage3.module.css';
import CommonComponent from '../main_top';
import { useTheme } from '../theme';

const FormPage3 = () => {
    const { isBlue, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        toggleTheme();
        const storedData = JSON.parse(localStorage.getItem('formData'));
        if (storedData) {
            setFormData(storedData);
        } else {
            alert('FormPage ma\'lumotlari topilmadi.');
            navigate('/form1');
        }
    }, [navigate, toggleTheme]);

    const handleChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!phoneNumber) {
            alert('Iltimos, telefon raqamini to\'ldiring.');
            return;
        }

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            alert('Autentifikatsiya xatosi. Iltimos, qayta kirish qiling.');
            navigate('/login');
            return;
        }

        try {
            setLoading(true);


            const requestData = {
                user: formData.user, // 1 va 2-pagelardan olingan foydalanuvchi ID
                request_type: formData.request_type, // 1 va 2-pagelardan olingan so'rov turi
                where: formData.where, // 1 va 2-pagelardan olingan joy
                whereTo: formData.whereTo, // 1 va 2-pagelardan olingan joyga borish
                phone_number: phoneNumber, // Faqat telefon raqami
                is_active: true, // Faol holat
                Yolovchilar: formData.Yolovchilar, // 1 va 2-pagelardan olingan yo'lovchilar soni
                car: formData.car // 1 va 2-pagelardan olingan mashina turi
            };

            console.log('Yuborilayotgan ma\'lumotlar:', requestData); // Yuborilayotgan ma'lumotlarni konsolga chiqarish

            await axios.post(
                'https://taxibuxoro.pythonanywhere.com/requests/',
                requestData,
                {
                    headers: {
                        'Authorization': `JWT ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert(`So'rov muvaffaqiyatli yuborildi, adminlar ko'rib chiqib siz bilan aloqaga chiqishadi!`);
            navigate('/'); // Muvaffaqiyatli bo'lsa, asosiy sahifaga yo'naltirish

        } catch (error) {
            console.error('So\'rovni yuborishda xatolik:', error);
            alert('Xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <CommonComponent />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Telefon raqam:</label>
                    <input
                        className={isBlue ? styles.inputBlue : styles.inputWhite}
                        type="text"
                        name="phone_number"
                        value={phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.buttoncomponent}>
                        <button className={styles.submitButton} onClick={() => navigate(-1)}> Orqaga </button>
                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            {loading ? 'Yuborilmoqda...' : 'So\'rov yuborish'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormPage3;