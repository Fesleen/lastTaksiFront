import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './formmail2.module.css';
import CommonComponentForm2 from '../main_top_pochta';
import { useTheme } from '../theme';

const FormMailPage2 = () => {
    const navigate = useNavigate();
    const { isBlue } = useTheme();
    const [formMailData2, setformMailData2] = useState({
        additionalInfo: '',
        yolovchiSoni: '',
    });

    const savedformMailData = JSON.parse(localStorage.getItem('formMailData'));

    useEffect(() => {
        if (!savedformMailData) {
            alert('FormPage ma\'lumotlari topilmadi.');
            navigate('/form-mail');
        }
    }, [savedformMailData, navigate]); // toggleTheme ni dependency array ga qo'shmaymiz


    const handleChange = (e) => {
        const { name, value } = e.target;
        setformMailData2({
            ...formMailData2,
            [name]: value
        });

        // Agar siz har bir o'zgarishda tema o'zgartirishni xohlasangiz
        // toggleTheme(); // Bu qatorda faqat agar kerak bo'lsa qo'shing
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formMailData2.yolovchiSoni) {
            alert('Iltimos, barcha maydonlarni to\'ldiring.');
            return;
        }

        // Ma'lumotlarni saqlash
        localStorage.setItem('formMailData', JSON.stringify({ ...savedformMailData, ...formMailData2 }));
        navigate('/formmail3'); // Keyingi sahifaga o'tish
    };

    return (
        <>
            <CommonComponentForm2 />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Yo'lovchilar soni:</label>
                    <input
                        className={isBlue ? styles.inputBlue : styles.inputWhite}
                        type="text"
                        name="yolovchiSoni" 
                        value={formMailData2.yolovchiSoni}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.buttoncomponent}>
                        <button type="button" className={styles.submitButton} onClick={() => navigate(-1)}> Orqaga </button>
                        <button type="submit" className={styles.submitButton}>Keyingisi</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormMailPage2;