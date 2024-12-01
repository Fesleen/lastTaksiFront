import React, { useState, useEffect } from 'react';
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

  const [balance, setBalance] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setBalance('0');
    setPassword('cradev1234');
  }, []);

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
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('phone_number', formData.phone_number);
    formDataToSend.append('passport_photo', formData.passport_photo);
    formDataToSend.append('prava_photo', formData.prava_photo);

    formDataToSend.append('balance', balance);
    formDataToSend.append('password', password);

    try {
      await axios.post('https://taxibuxoro.pythonanywhere.com/users/register/', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert(`Registration failed. ${error.response?.data?.message || 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="form_group" onSubmit={handleSubmit}>
        <h2>Ro'yxatdan o'tish!</h2>
        <div className="input_group">
          <label  htmlFor="first_name">Ismingiz:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder='Ismingizni kiriting'
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input_group">
          <label  htmlFor="last_name">Familya:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder='Familyangizni  kiriting'
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input_group">
          <label  htmlFor="phone_number">Telefon Raqam:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder='+998'
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input_group">
          <label  htmlFor="passport_photo">Passport Rasm:</label>
          <input
            type="file"
            id="passport_photo"
            name="passport_photo"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="input_group">
          <label  htmlFor="prava_photo">Haydovchilik guvohnomasi fotosurati:</label>
          <input
            type="file"
            id="prava_photo"
            name="prava_photo"
            onChange={handleFileChange}
            required
          />
        </div>

        {isLoading ? (
          <span>Yuklanmoqda...</span>
        ) : (
          <button type="submit" className="submitButton">
            Ro'yxatdan o'tish
          </button>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
