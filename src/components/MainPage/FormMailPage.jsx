import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './FormMailPage.module.css';

const FormMailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const originalWhereOptions = ['toshkent', 'bog\'dod-rishton-buvayda', 'qo\'qon', 'uchko\'prik'];
    const originalWhereToOptions = ['toshkent', 'bog\'dod-rishton-buvayda', 'qo\'qon', 'uchko\'prik'];

    const whereOptions = originalWhereOptions.map(option => option.toUpperCase());
    const whereToOptions = originalWhereToOptions.map(option => option.toUpperCase());

    const [formData, setFormData] = useState({
        request_type: 'pochta_berish',
        where: originalWhereOptions[0],
        whereTo: originalWhereToOptions[0],
        phone_number: ''
    });
    const [telegramId, setTelegramId] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchTelegramId = async () => {
            try {
                const response = await axios.get('http://taksibot.pythonanywhere.com/users/profiles/');
                const data = response.data;
                const user = data.find(profile => profile.telegram_id === formData.telegram_id);
                setTelegramId(user.id);
            } catch (error) {
                console.error('Error fetching telegram_id:', error);
            }
        };

        fetchTelegramId();
    }, [formData.telegram_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.toLowerCase()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://taksibot.pythonanywhere.com/requests/', {
                ...formData,
                user: telegramId,
                is_active: true
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
        <div className={styles.formContainer}>
            {!submitted ? (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Where:
                        <select
                            className={styles.select}
                            name="where"
                            value={formData.where}
                            onChange={handleChange}
                        >
                            {whereOptions.map((option, index) => (
                                <option key={index} value={originalWhereOptions[index]}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className={styles.label}>
                        WhereTo:
                        <select
                            className={styles.select}
                            name="whereTo"
                            value={formData.whereTo}
                            onChange={handleChange}
                        >
                            {whereToOptions.map((option, index) => (
                                <option key={index} value={originalWhereToOptions[index]}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className={styles.label}>
                        Phone Number:
                        <input
                            className={styles.input}
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </label>
                    <button className={styles.button} type="submit">Submit</button>
                </form>
            ) : (
                <div className={styles.returnContainer}>
                    <p>Your request has been submitted successfully!</p>
                    <button className={styles.button} onClick={handleReturn}>Return to Main Page</button>
                </div>
            )}
        </div>
    );
};

export default FormMailPage;
