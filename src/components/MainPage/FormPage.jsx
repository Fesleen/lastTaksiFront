import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './FormPage.module.css';
import CommonComponent from '../main_top';
import { useTheme } from '../theme';

const FormPage = () => {
    const { isBlue, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const requestType = params.get('type') || 'yolovchi_berish';

    const toshkentDistricts = [
        "Bektemir", "Mirobod", "Mirzo Ulug'bek", "Sirg'ali", "Chilonzor", "Yakkasaroy", "Shayxontohur", "Yunusobod", "Olmazor"
    ];
    const samarqandDistricts = [
        "Samarqand", "Kattakurgan", "Jomboy", "Narpay", "Oqdarya", "Pastdargom", "Payariq", "Bulung'ur", "Tayloq"
    ];

    const originalWhereOptions = ['toshkent', 'samarqand'];

    const [formData, setFormData] = useState({
        request_type: requestType,
        where: '',
        whereTo: '',
        tuman: '',
        tuman2: '',
        is_active: true 
    });

    useEffect(() => {
        toggleTheme();
    }, []); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!formData.where || !formData.tuman || !formData.whereTo || !formData.tuman2) {
            alert('Iltimos, barcha maydonlarni to\'ldiring.');
            return;
        }
    
        // Foydalanuvchi ma'lumotlarini olish (masalan, hardcoded yoki boshqa joydan)
        const user = 'user_id_value'; // Bu yerda foydalanuvchi ID ni oling
    
        // Form ma'lumotlarini saqlash
        const dataToSave = { ...formData, user };
        localStorage.setItem('formData', JSON.stringify(dataToSave));
        navigate('/form2'); 
    };

    
    return (
        <>
            <CommonComponent />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>So'rov turini tanlang:</label>
                    <select
                        className={isBlue ? styles.selectBlue : styles.selectWhite}
                        name="request_type"
                        value={formData.request_type}
                        onChange={handleChange}
                    >
                        <option value="yolovchi_berish">Yo'lovchi berish</option>
                        <option value="pochta_berish">Pochta berish</option>
                    </select>

                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Qayer dan(viloyat):</label>
                    <select
                        className={isBlue ? styles.selectBlue : styles.selectWhite}
                        name="where"
                        value={formData.where}
                        onChange={handleChange}
                    >
                        <option value="">Viloyatni tanlang</option>
                        {originalWhereOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option.toUpperCase()}
                            </option>
                        ))}
                    </select>

                    <div className={styles.select_group}>
                        <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Tuman:</label>
                        <select
                            className={isBlue ? styles.selectBlue : styles.selectWhite}
                            name="tuman"
                            value={formData.tuman}
                            onChange={handleChange }>
                            <option value="">Tumanni tanlang</option>
                            {(formData.where === 'toshkent' ? toshkentDistricts : samarqandDistricts).map((tuman, index) => (
                                <option key={index} value={tuman}>
                                    {tuman.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Qayerga(viloyat):</label>
                    <select
                        className={isBlue ? styles.selectBlue : styles.selectWhite}
                        name="whereTo"
                        value={formData.whereTo}
                        onChange={handleChange}
                    >
                        <option value="">Viloyatni tanlang</option>
                        {originalWhereOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option.toUpperCase()}
                            </option>
                        ))}
                    </select>

                    <div className={styles.select_group}>
                        <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Tuman:</label>
                        <select
                            className={isBlue ? styles.selectBlue : styles.selectWhite}
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
                    <div className={styles.buttoncomponent}>
                        <button type="button" className={styles.submitButton} onClick={() => navigate(-1)}> Orqaga </button>
                        <button type="submit" className={styles.submitButton}>Keyingisi</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormPage;