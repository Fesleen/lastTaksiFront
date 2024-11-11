import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FormPage2.module.css';
import CommonComponent from '../main_top';

const FormMailPagePochta = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone_number: '',
    });

    const savedFormData = JSON.parse(localStorage.getItem('formData'));

    useEffect(() => {
        if (!savedFormData) {
            alert('FormPage ma\'lumotlari topilmadi.');
            navigate('/pochta');
        }
    }, [savedFormData, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('Authorization token not found.');
            return;
        }

        try {
            // Send request to the API with combined form data
            await axios.post('https://taksibot.pythonanywhere.com/requests/', {
                ...savedFormData,  // Data from FormPage or previous page
                ...formData,       // Data from current form
            }, {
                headers: { Authorization: `JWT ${token}` },
            });

            alert('Request successfully submitted.');

            alert(`Sizning so'rovingiz muvaffaqqiyatli jo'natildi!`);

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred.');
        }
    };

    return (
        <>
            <CommonComponent />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label}>Telefon raqamingiz:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                    <button className={styles.button} type="submit">Yuborish</button>
                </form>
            </div>
        </>
    );
};

export default FormMailPagePochta;
