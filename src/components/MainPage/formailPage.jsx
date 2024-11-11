import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FormMailPage.module.css';
import CommonComponentPochta from '../main_top_pochta';

const FormMailPagePochta = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone_number: '',
        where: 'toshkent',
        whereTo: 'samarqand',
    });
    const [response, setResponse] = useState(null);  
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(null); 

    useEffect(() => {
        // LocalStorage'dan ma'lumotni olish
        const savedFormData = JSON.parse(localStorage.getItem('formData'));
        if (savedFormData) {
            setFormData(savedFormData);
        } else {
            alert(`Form ma'lumotlari topilmadi.`);
            navigate('/formpage');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('Authorization token not found.');
            return;
        }

        setLoading(true);  
        setError(null);  

        try {
            // API ga ma'lumot yuborish
            const response = await axios.post('https://taksibot.pythonanywhere.com/requests/', formData, {
                headers: { Authorization: `JWT ${token}` },
            });
            
            setLoading(false);  
            setResponse(response.data);
            alert(`Sizning so'rovingiz muvaffaqqiyatli jo'natildi!`);
        } catch (error) {
            setLoading(false);  
            setError(error.message || 'Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');  
            console.error('Error:', error);
        }
    };

    return (
        <>
            <CommonComponentPochta />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.form_label}>
                        Telefon Raqam:
                        <input
                            className={styles.input}
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                            required
                        />
                    </label>
                    <button className={styles.button} type="submit" disabled={loading}>
                        {loading ? 'Yuborilmoqda...' : 'Yuborish'}
                    </button>
                </form>

                {/* Displaying response message */}
                {response && (
                    <div className={styles.response}>
                        <h3>Response:</h3>
                        <pre>{JSON.stringify(response, null, 2)}</pre>
                    </div>
                )}

                {/* Displaying error message */}
                {error && (
                    <div className={styles.error}>
                        <p className={styles.eror}>{error}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default FormMailPagePochta;
