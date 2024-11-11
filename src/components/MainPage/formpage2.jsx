import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FormPage2.module.css';
import CommonComponent from '../main_top';

const FormPage2 = () => {
    const navigate = useNavigate();
    const [formData2, setFormData2] = useState({
        phone_number: '',
        yolovchiSoni: '',
        gender: '',
        price: ''
    });

    const savedFormData = JSON.parse(localStorage.getItem('formData'));

    useEffect(() => {
        if (!savedFormData) {
            alert('FormPage ma\'lumotlari topilmadi.');
            navigate('/formpage');
        }
    }, [savedFormData, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData2({
            ...formData2,
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
            await axios.post('https://taksibot.pythonanywhere.com/requests/', {
                ...savedFormData,  
                ...formData2,   
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
                        value={formData2.phone_number}
                        onChange={handleChange}
                    />

                    <label className={styles.label}>Yolovchi soni:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="yolovchiSoni"
                        value={formData2.yolovchiSoni}
                        onChange={handleChange}
                    />

                    <label className={styles.label}>Jins:</label>
                    <select
                        className={styles.select}
                        name="gender"
                        value={formData2.gender}
                        onChange={handleChange}
                    >
                        <option value="male">Erkak</option>
                        <option value="female">Ayol</option>
                    </select>

                    <label className={styles.label}>Narx:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="price"
                        value={formData2.price}
                        onChange={handleChange}
                    />

                    <button className={styles.button} type="submit">Yuborish</button>
                </form>
            </div>
        </>
    );
};

export default FormPage2;
