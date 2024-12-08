import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './FormMailPage.module.css';
import CommonComponentForm2 from '../main_top_pochta';
import { useTheme } from '../theme';

const FormMailPage = () => {
    const { isBlue } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const getrequestType = params.get('type') || 'yolovchi_olish';

    const districts = {
        toshkent: [
            "Bektemir", "Mirobod", "Mirzo Ulug'bek", "Sirg'ali",
            "Chilonzor", "Yakkasaroy", "Shayxontohur", "Yunusobod", "Olmazor"
        ],
        samarqand: [
            "Samarqand", "Kattakurgan", "Jomboy", "Narpay",
            "Oqdarya", "Pastdargom", "Payariq", "Bulung'ur", "Tayloq"
        ],
        andijon: [
            "Andijon", "Asaka", "Buloqboshi", "Izboskan",
            "Jalaquduq", "Marhamat", "Oltinqo'rg'on", "Shahrixon", "Xo'jaobod"
        ],
        buxoro: [
            "Buxoro", "Qorako'l", "G'ijduvon", "Kogon",
            "Jondor", "Shofirkon", "Vobkent", "Romitan", "Peshku"
        ],
        jizzax: [
            "Jizzax", "Baxmal", "Zarbdor", "G'alaba",
            "Do'stlik", "Yangiyer", "Mirzacho'l"
        ],
        qashqadaryo: [
            "Qarshi", "Shahrisabz", "Kitob", "Dehqonobod",
            "Koson", "Muborak", "Nishon", "Yakkabog'"
        ],
        navoi: [
            "Navoi", "Zafarobod", "Karmana", "Nurota",
            "Tomdi", "Uchquduq", "Konimex"
        ],
        namangan: [
            "Namangan", "Chortoq", "Chust", "Kosonsoy",
            "Mingbuloq", "Norin", "Pop", "Uychi"
        ],
        fargona: [
            "Farg'ona", "Qo'qon", "Marg'ilon", "Oltiariq",
            "Beshariq", "Rishton", "Uchko'prik", "Yazyovon"
        ],
        xorazm: [
            "Urganch", "Xiva", "Gurlan", "Yangibozor",
            "Shovot", "Qo'shko'pir", "Bog'ot"
        ],
        qoraqalpoq: [
            "Nukus", "Chimboy", "Qanlikul", "Taxtako'pir",
            "Ellikqal'a", "Beruniy", "Kegeyli", "Shumanay"
        ],
        surxandaryo: [
            "Termiz", "Angor", "Boysun", "Denov",
            "Jarqo'rg'on", "Muzrabot", "Oltinsoy", "Sariosiyo", "Sherobod"
        ],
        sirdaryo: [
            "Guliston", "Boyovut", "Oqoltin", "Sirdaryo",
            "Sardoba", "Mirzaobod", "Yangiyer"
        ]
    };

    const originalWhereOptions = Object.keys(districts);

    const [formMailData, setformMailData] = useState({
        getrequest_type: getrequestType,
        whereIs: '',
        whereTo: '',
        tuman: '',
        tuman2: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformMailData({
            ...formMailData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formMailData.whereIs || !formMailData.tuman || !formMailData.whereTo || !formMailData.tuman2) {
            alert('Iltimos, barcha maydonlarni to\'ldiring.');
            return;
        }

        const user = 'user_id_value'; // Bu yerda foydalanuvchi ID ni oling
        const dataToSave = { ...formMailData, user };
        localStorage.setItem('formMailData', JSON.stringify(dataToSave));
        navigate('/formmail2');
    };

    return (
        <>
            <CommonComponentForm2 />
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>So'rov turini tanlang:</label>
                    <select
                        className={isBlue ? styles.selectBlue : styles.selectWhite}
                        name="getrequest_type"
                        value={formMailData.getrequest_type}
                        onChange={handleChange}
                    >
                        <option value="yolovchi_olish">Yo'lovchi olish</option>
                        <option value="pochta_olish">Pochta olish</option>
                    </select>

                    <label className={isBlue ? styles.labelBlue : styles.labelWhite}>Qayerdan(viloyat):</label>
                    <select
                        className={isBlue ? styles.selectBlue : styles.selectWhite}
                        name="whereIs"
                        value={formMailData.whereIs}
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
                            value={formMailData.tuman}
                            onChange={handleChange}>
                            <option value="">Tumanni tanlang</option>
                            {(formMailData.whereIs ? districts[formMailData.whereIs] : []).map((tuman, index) => (
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
                        value={formMailData.whereTo}
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
                            value={formMailData.tuman2}
                            onChange={handleChange}
                        >
                            <option value="">Tumanni tanlang</option>
                            {(formMailData.whereTo ? districts[formMailData.whereTo] : []).map((tuman, index) => (
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

export default FormMailPage;