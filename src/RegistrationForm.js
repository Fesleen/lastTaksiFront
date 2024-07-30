// src/RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    passport_photo: null,
    prava_photo: null,
  });
  const [balance, setBalance] = useState(0);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true); // Set loading state to true
    
    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('phone_number', formData.phone_number);
    formDataToSend.append('passport_photo', formData.passport_photo);
    formDataToSend.append('prava_photo', formData.prava_photo);
    formDataToSend.append('balance', balance);
    formDataToSend.append('password', password || 'cradev1234'); // Use default password if balance is 0

    try {
      await axios.post('https://taksibot.pythonanywhere.com/users/register/', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="registration-form">
      <h2>Ro'yhatdan o'tish</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">Ism:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Familya:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Telefon Raqam:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passport_photo">Passport Rasm:</label>
          <input
            type="file"
            id="passport_photo"
            name="passport_photo"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prava_photo">Prava Rasm:</label>
          <input
            type="file"
            id="prava_photo"
            name="prava_photo"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="balance">Balance:</label>
          <input
            type="number"
            id="balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Kutilmoqda...
              </>
            ) : (
              'Davom etish'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
