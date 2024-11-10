import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FormPage.module.css';

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
        phone_number: '',
        yolovchiSoni: '',
        tuman: '',
        tuman2: '',
        gender: '',
        price: ''
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
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('Authorization token not found. Please log in again.');
            return;
        }

        try {
            const response = await axios.get('https://taksibot.pythonanywhere.com/users/profile/', {
                headers: { Authorization: `JWT ${token}` }
            });
            const userId = response.data.id;

            await axios.post('https://taksibot.pythonanywhere.com/requests/', {
                ...formData,
                user: userId,
                is_active: false
            }, {
                headers: { Authorization: `JWT ${token}` }
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting request:', error);
            alert('An error occurred while submitting the request.');
        }
    };

    const handleReturn = () => {
        navigate('/');
    };

    return (
        <>
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

                        {formData.where === 'toshkent' && (
                            <div className={styles.select_group}>
                                <label className={styles.label}>Tuman:</label>
                                <select
                                    className={styles.select}
                                    name="tuman"
                                    value={formData.tuman}
                                    onChange={handleChange}
                                >
                                    <option value="">Tumanni tanlang</option>
                                    {toshkentDistricts.map((tuman, index) => (
                                        <option key={index} value={tuman}>
                                            {tuman.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

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

                        {formData.whereTo === 'toshkent' && (
                            <div className={styles.select_group}>
                                <label className={styles.label}>Tuman:</label>
                                <select
                                    className={styles.select}
                                    name="tuman2"
                                    value={formData.tuman2}
                                    onChange={handleChange}
                                >
                                    <option value="">Tumanni tanlang</option>
                                    {toshkentDistricts.map((tuman, index) => (
                                        <option key={index} value={tuman}>
                                            {tuman.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {formData.whereTo === 'samarqand' && (
                            <div className={styles.select_group}>
                                <label className={styles.label}>Tuman:</label>
                                <select
                                    className={styles.select}
                                    name="tuman2"
                                    value={formData.tuman2}
                                    onChange={handleChange}
                                >
                                    <option value="">Tumanni tanlang</option>
                                    {samarqandDistricts.map((tuman, index) => (
                                        <option key={index} value={tuman}>
                                            {tuman.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <label className={styles.label}>Telefon Raqam:</label>
                        <input
                            className={styles.input}
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                        />

                        <label className={styles.label}>Yo'lovchilar soni:</label>
                        <input
                            className={styles.input}
                            type="number"
                            name="yolovchiSoni"
                            value={formData.yolovchiSoni}
                            onChange={handleChange}
                        />

                        <label className={styles.label}>Jins:</label>
                        <select
                            name="gender"
                            className={styles.select}
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Tanlang</option>
                            <option value="male">Erkak</option>
                            <option value="female">Ayol</option>
                        </select>
                        <label className={styles.label}>Narxni kiriting</label>
                        <input
                            className={styles.input}
                            type="number"
                            name="Narxni kiriting"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <button className={styles.button} type="submit">Yuborish</button>
                    </form>
                ) : (
                    <div className={styles.returnContainer}>
                        <p>Sizning so'rovingiz muvaffaqqiyatli jo'natildi, adminlar so'rovni ko'rib chiqishadi va balans hisobingizga tushadi</p>
                        <button className={styles.button} onClick={handleReturn}>Sahifaga qaytish</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default FormPage;
