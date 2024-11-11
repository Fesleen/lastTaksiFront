import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import styles from "./style.module.css";

const CommonComponentPochta = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const getColor = (path) => {
    return location.pathname === path ? '#ffffff' : '#b0b0b0'; 
  };

  return (
    <div className={styles.container}>
      <div className={styles.Box}>
        <h1 className={styles.Box__h1}>POCHTA BERISH</h1>
        <div className={styles.Box__card}>
          <div
            className={styles.Box__card__item}
            onClick={() => handleNavigate('/form-mail')}
          >
            <LocationOnIcon sx={{ color: getColor('/form-mail') }} />
            <p className={styles.box__p} style={{ color: getColor('/form-mail') }}>Manzil</p>
          </div>
          <div
            className={styles.Box__card__item}
            onClick={() => handleNavigate('/pochta')}
          >
            <PersonIcon sx={{ color: getColor('/pochta') }} />
            <p className={styles.box__p} style={{ color: getColor('/pochta') }}>Shaxsiy ma'lumot</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonComponentPochta;
