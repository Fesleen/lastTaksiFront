import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './formmail3.module.css';
import CommonComponentForm2 from '../main_top_pochta';
import { useTheme } from '../theme';

const FormPage3 = () => {
    const { isBlue } = useTheme();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [formMailData, setFormMailData] = useState(null);

    useEffect(() => {
        const storedMailData = JSON.parse(localStorage.getItem('formMailData'));
        if (storedMailData) {
            setFormMailData(storedMailData);
        } else {
            alert('FormPage ma\'lumotlari topilmadi.');
            navigate('/form-mail');
        }
    }, [navigate]);



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

            const requestMailData = {
                user: formMailData.user,
                getrequest_type: formMailData.getrequest_type,
                whereIs: formMailData.whereIs,
                whereTo: formMailData.whereTo,
                phone_number: phoneNumber,
                yolovchiSoni: formMailData.yolovchiSoni,
            };

            console.log('Yuborilayotgan ma\'lumotlar:', requestMailData);

            await axios.post(
                'https://taxibuxoro.pythonanywhere.com/getrequests/',
                requestMailData,
                {
                    headers: {
                        'Authorization': `JWT ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert(`So'rov muvaffaqiyatli yuborildi, adminlar ko'rib chiqib siz bilan aloqaga chiqishadi!`);
            navigate('/');

        } catch (error) {
            console.error('So\'rovni yuborishda xatolik:', error);
            alert('Xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <CommonComponentForm2 />
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