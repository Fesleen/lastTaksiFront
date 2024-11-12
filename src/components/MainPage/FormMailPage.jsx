import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FormMailPage.module.css';
import CommonComponentPochta from '../main_top_pochta';

const FormMailPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone_number: '',
        where: 'toshkent',
        whereTo: 'samarqand',
    });

    useEffect(() => {
        // Check if form data exists in localStorage
        const savedFormData = JSON.parse(localStorage.getItem('formData'));
        if (!savedFormData) {
            alert('Form data not found.');
            navigate('/pochta');
        } else {
            // If found, set formData with the saved data
            setFormData(savedFormData);
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Save form data to localStorage
        localStorage.setItem('formData', JSON.stringify(formData));

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                alert('Authorization token not found.');
                return;
            }

            // Send API request
            const response = await axios.post('https://samarqandtaksi.pythonanywhere.com/requests/', formData, {
                headers: { Authorization: `JWT ${token}` },
            });

            if (response.status === 200) {
                alert("Sizning so'rovingiz muvaffaqqiyatli jo'natildi!");
                navigate('/pochta');
            } else {
                alert("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
        }
    };

    return (
        <>
            <CommonComponentPochta />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.form_label}>
                        Qayerdan:
                        <select
                            className={styles.select}
                            name="where"
                            value={formData.where}
                            onChange={handleChange}
                        >
                            <option value="toshkent">Toshkent</option>
                            <option value="samarqand">Samarqand</option>
                        </select>
                    </label>
                    <label className={styles.form_label}>
                        Qayerga:
                        <select
                            className={styles.select}
                            name="whereTo"
                            value={formData.whereTo}
                            onChange={handleChange}
                        >
                            <option value="toshkent">Toshkent</option>
                            <option value="samarqand">Samarqand</option>
                        </select>
                    </label>
                    <button className={styles.button} type="submit">Yuborish</button>
                </form>
            </div>
        </>
    );
};

export default FormMailPage;
