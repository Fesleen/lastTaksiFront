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
        Yolovchilar: '',
        car: ''
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

        if (!formData2.Yolovchilar || !formData2.car) {
            alert('Iltimos, barcha maydonlarni to\'ldiring.');
            return;
        }

        // Ma'lumotlarni saqlash
        localStorage.setItem('formData', JSON.stringify({ ...savedFormData, ...formData2 }));
        navigate('/form3'); // Keyingi sahifaga o'tish
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
                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Mashina turi:</label>
                    <select
                        className={isBlue ? styles.selectBlue : styles.selectWhite}
                        name="car"
                        value={formData2.car}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Mashina turini tanlang</option>
                        <option value="Cobalt">Cobalt</option>
                        <option value="Lacetti">Lacetti</option>
                        <option value="Nexia">Nexia</option>
                        <option value="Gentra">Gentra</option>
                        <option value="Captiva">Captiva</option>
                    </select>
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