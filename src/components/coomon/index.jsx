import React, { useState } from 'react';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import styles from "./style.module.css"

function ButtonTop() {
    const navigate = useNavigate();
    const [isBlue, setIsBlue] = useState(false);

    const handleToggle = () => {
        setIsBlue(!isBlue);
        document.body.style.backgroundColor = isBlue ? 'white' : '#070038 ';
    };
    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.container}>
        <div className={styles.Buttonsgroup}>
            <p className={isBlue ? styles.textOnBlueP : styles.textOnWhiteP}>Farovon Yo'l</p>
            <button onClick={handleToggle} className={styles.buttonTop}>
                <BedtimeIcon />
            </button>
            <button className={styles.buttonTop} onClick={() => handleNavigate('/profil')}>
                <PersonIcon />
            </button>
        </div>
    </div>
    );
}

export default ButtonTop;
