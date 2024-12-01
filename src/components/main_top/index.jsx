import React  from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import styles from "./style.module.css";

const CommonComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };


  const getColor = (path) => {
    return location.pathname === path ? 'black' : '#b0b0b0';
  };

  return (
    <div className={styles.container}>
      <div className={styles.Box}>
        <h1 className={styles.Box__h1}>YO'LOVCHI  OLISH</h1>
        <div className={styles.Box__card}>
          <div
            className={styles.Box__card__item}
            onClick={() => handleNavigate('/form')}
          >
            <LocationOnIcon sx={{ color: getColor('/form') }}  />
            <p className={styles.box__p} style={{ color: getColor('/form') }}>Manzil</p>
          </div>
          <div
            className={styles.Box__card__item}
            onClick={() => handleNavigate('/form2')}
          >
            <GroupsIcon sx={{ color: getColor('/form2') }} />
            <p className={styles.box__p} style={{ color: getColor('/form2') }}>Yo'lovchilar va narx</p>
          </div>
          <div
            className={styles.Box__card__item}
            onClick={() => handleNavigate('/form3')}
          >
            <PersonIcon sx={{ color: getColor('/form3') }} />
            <p className={styles.box__p} style={{ color: getColor('/form3') }}>Shaxsiy ma'lumot</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonComponent;
