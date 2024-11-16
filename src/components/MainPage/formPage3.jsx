import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme'; 
import styles from './FormPage3.module.css'; 
import CommonComponent from '../main_top';

const FormPage3 = () => {
    const navigate = useNavigate();
    const { isBlue } = useTheme(); 
    const [phoneNumber, setPhoneNumber] = useState('');

    const savedFormData = JSON.parse(localStorage.getItem('formData'));

    useEffect(() => {
        if (!savedFormData) {
            alert('FormPage ma\'lumotlari topilmadi.');
            navigate('/form1');
        }
    }, [savedFormData, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiData = {
            id: 0, 
            user: 0, 
            request_type: savedFormData.request_type, 
            where: savedFormData.where, 
            whereTo: savedFormData.whereTo, 
            phone_number: phoneNumber, 
            is_active: true 
        };
        console.log(apiData); 

        try {
            const response = await fetch('https://samarqandtaksi.pythonanywhere.com/requests/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data); 
            navigate('/success'); 
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('Xatolik yuz berdi: ' + error.message); 
        }
    };

    return (
        <>
            <CommonComponent />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Telefon raqamni kiriting:</label>
                    <input
                        className={isBlue ? styles.inputBlue : styles.inputWhite}
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required 
                    />
                    <div className={styles.buttoncomponent}>
                        <button type="button" className={styles.submitButton} onClick={() => navigate(-1)}>Orqaga</button>
                        <button type="submit" className={styles.submitButton}>Yuborish</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormPage3;