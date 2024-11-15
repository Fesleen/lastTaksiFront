import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './FormPage.module.css';
import axios from 'axios';
import CommonComponent from '../main_top';

const FormPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const requestType = params.get('type') || 'yolovchi_berish';

    const toshkentDistricts = ["Bektemir", "Mirobod", "Mirzo Ulug'bek", "Sirg'ali", "Chilonzor", "Yakkasaroy", "Shayxontohur", "Yunusobod", "Olmazor"];
    const samarqandDistricts = ["Samarqand", "Kattakurgan", "Jomboy", "Narpay", "Oqdarya", "Pastdargom", "Payariq", "Bulung'ur", "Tayloq"];

    const originalWhereOptions = ['toshkent', 'samarqand'];
    const originalWhereToOptions = ['toshkent', 'samarqand'];

    const [formData, setFormData] = useState({
        request_type: requestType,
        where: 'toshkent',
        whereTo: 'samarqand',
        tuman: '',
        tuman2: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem('authToken'); // Replace 'authToken' with the actual key if different
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
            const response = await axios.post(
                'https://samarqandtaksi.pythonanywhere.com/requests/',
                formData,
                { headers }
            );
    
            if (response.status === 200) {
                localStorage.setItem('formData', JSON.stringify(formData));
                setSubmitted(true);
                navigate('/form2');
            } else {
                alert('So\'rov yuborishda xatolik yuz berdi.');
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
            alert('So\'rov yuborishda xatolik yuz berdi.');
        }
    };
    

    return (
        <>
            <CommonComponent />
            <div className={styles.container}>
                {!submitted ? (
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label className={styles.label}>Qayerdan:</label>
                        <select
                            className={styles.select}
                            name="where"
                            value={formData.where}
                            onChange={handleChange}
                        >
                            {originalWhereOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option.toUpperCase()}
                                </option>
                            ))}
                        </select>

                        <div className={styles.select_group}>
                            <label className={styles.label}>Tuman:</label>
                            <select
                                className={styles.select}
                                name="tuman"
                                value={formData.tuman}
                                onChange={handleChange}
                            >
                                <option value="">Tumanni tanlang</option>
                                {(formData.where === 'toshkent' ? toshkentDistricts : samarqandDistricts).map((tuman, index) => (
                                    <option key={index} value={tuman}>
                                        {tuman.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className={styles.label}>Qayerga:</label>
                        <select
                            className={styles.select}
                            name="whereTo"
                            value={formData.whereTo}
                            onChange={handleChange}
                        >
                            {originalWhereToOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option.toUpperCase()}
                                </option>
                            ))}
                        </select>

                        <div className={styles.select_group}>
                            <label className={styles.label}>Tuman:</label>
                            <select
                                className={styles.select}
                                name="tuman2"
                                value={formData.tuman2}
                                onChange={handleChange}
                            >
                                <option value="">Tumanni tanlang</option>
                                {(formData.whereTo === 'toshkent' ? toshkentDistricts : samarqandDistricts).map((tuman, index) => (
                                    <option key={index} value={tuman}>
                                        {tuman.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button className={styles.button} type="submit">Keyingisi</button>
                    </form>
                ) : (
                    <div className={styles.returnContainer}>
                        <p>Sizning so'rovingiz muvaffaqqiyatli jo'natildi, adminlar so'rovni ko'rib chiqishadi va balans hisobingizga tushadi</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default FormPage;
