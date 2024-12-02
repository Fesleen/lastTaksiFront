import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FormPage2.module.css';
import CommonComponent from '../main_top';
import { useTheme } from '../theme';

const FormPage2 = () => {
    const { isBlue } = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        additionalInfo: ''
    });

    useEffect(() => {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const data = JSON.parse(savedData);
            setFormData(prevState => ({
                ...prevState,
                request_type: data.request_type,
                where: data.where,
                tuman: data.tuman,
                whereTo: data.whereTo,
                tuman2: data.tuman2
            }));
        } else {
            navigate('/form'); // Agar avvalgi forma ma'lumotlari mavjud bo'lmasa, qaytish
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Ma\'lumotlar muvaffaqiyatli jo\'natildi!');
        // Ma'lumotlarni saqlash yoki yuborish jarayonlari
        console.log(formData);
        localStorage.removeItem('formData'); // Formani to'ldirgandan keyin saqlangan ma'lumotlarni o'chirish
        navigate('/'); // Asosiy sahifaga qaytish
    };

    return (
        <>
            <CommonComponent />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Telefon raqami:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={isBlue ? styles.inputBlue : styles.inputWhite}
                    />

                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Email manzili:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={isBlue ? styles.inputBlue : styles.inputWhite}
                    />

                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Qo'shimcha ma'lumot:</label>
                    <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className={isBlue ? styles.textareaBlue : styles.textareaWhite}
                    />

                    <button type="submit" className={styles.submitButton}>
                        Jo'natish
                    </button>
                </form>
            </div>
        </>
    );
};

export default FormPage2;