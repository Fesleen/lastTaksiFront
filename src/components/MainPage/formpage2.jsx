import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FormPage2.module.css';
import CommonComponent from '../main_top';
import { useTheme } from '../theme';

const FormPage2 = () => {
    const navigate = useNavigate();
    const { isBlue } = useTheme(); 
    const [formData2, setFormData2] = useState({
        additionalInfo: '',
        Yolovchilar: ''
    });

    const savedFormData = JSON.parse(localStorage.getItem('formData'));

    useEffect(() => {
        if (!savedFormData) {
            alert('FormPage ma\'lumotlari topilmadi.');
            navigate('/form1');
        }
    }, [savedFormData, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData2({
            ...formData2,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        if (!formData2.Yolovchilar) {
            alert('Iltimos, barcha maydonlarni to\'ldiring.');
            return;
        }



        localStorage.setItem('formData', JSON.stringify({ ...savedFormData, ...formData2 }));
        navigate('/form3'); // 
    };

    return (
        <>
            <CommonComponent />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Yo'lovchilar soni:</label>
                    <input
                        className={isBlue ? styles.inputBlue : styles.inputWhite}
                        type="text"
                        name="Yolovchilar" 
                        value={formData2.Yolovchilar}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.buttoncomponent}>
                        <button className={styles.submitButton} onClick={() => navigate(-1)}> Orqaga </button>
                        <button type="submit" className={styles.submitButton}>Keyingisi</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormPage2;