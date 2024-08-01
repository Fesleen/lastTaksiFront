import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ userId, requestId, requestType, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Request Details</h2>
                <p>User ID: {userId}</p>
                <p>Request ID: {requestId}</p>
                <p>Request Type: {requestType}</p>
                <button className={styles.modalButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
