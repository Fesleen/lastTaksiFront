import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchPage.module.css';

const Search2Page = () => {
    const [where, setWhere] = useState('toshkent');
    const [whereTo, setWhereTo] = useState('qo\'qon');
    const [results, setResults] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const response = await axios.get('https://taksibot.pythonanywhere.com/users/profile/', {
                        headers: { Authorization: `JWT ${token}` }
                    });
                    const { id } = response.data;
                    setUserId(id);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSearch = async () => {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('https://taksibot.pythonanywhere.com/users/profile/', {
                headers: { Authorization: `JWT ${token}` }
            });
            const { id } = response.data;
            try {
                const response = await axios.get(`https://taksibot.pythonanywhere.com/search/?where=${where}&whereTo=${whereTo}`);
                const filteredResults = response.data.filter(result => result.request_type === 'pochta_berish');
                setResults(filteredResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleShowPhoneNumber = async (requestId, index) => {
        const confirmOpen = window.confirm(`Raqamni ko\'rishni istaysizmi?`);
        if (confirmOpen) {
            try {
                const token = localStorage.getItem('accessToken');
                console.log("Token :", token)
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await axios.post('https://taksibot.pythonanywhere.com/getrequests/', {
                    user: 1,
                    request: 1,
                    getrequest_type: 'yolovchi_olish',
                }, {
                    headers: { Authorization: `JWT ${token}` }
                });
                

                const phoneNumber = response.data.phone_number;
    
                setResults((prevResults) =>
                    prevResults.map((result, idx) =>
                        idx === index ? { ...result, phone_number: phoneNumber } : result
                    )
                );

            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.inputContainer}>
                <label>
                    Where:
                    <select value={where} onChange={(e) => setWhere(e.target.value)}>
                        <option value="toshkent">TASHKENT</option>
                        <option value="bog'dod-rishton-buvayda">BAGHDAD-RISHTON-BUVAYDA</option>
                        <option value="qo'qon">KOQAN</option>
                        <option value="uchko'prik">UCHKOPRIK</option>
                    </select>
                </label>
                <label>
                    WhereTo:
                    <select value={whereTo} onChange={(e) => setWhereTo(e.target.value)}>
                        <option value="toshkent">TASHKENT</option>
                        <option value="bog'dod-rishton-buvayda">BAGHDAD-RISHTON-BUVAYDA</option>
                        <option value="qo'qon">KOQAN</option>
                        <option value="uchko'prik">UCHKOPRIK</option>
                    </select>
                </label>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className={styles.resultsContainer}>
                {results.map((result, index) => (
                    <div key={index} className={styles.resultItem}>
                        <p>Request Type: {result.request_type}</p>
                        <p>Where: {result.where}</p>
                        <p>WhereTo: {result.whereTo}</p>
                        <p>
                            Phone Number: 
                            {result.phone_number ? (<button 
                                    className={styles.showPhoneNumberButton} 
                                    onClick={() => handleShowPhoneNumber(result.id, index)}
                                >
                                    Telefon raqamni ko'rish
                                </button>
                            ) : (
                                <span>{result.phone_number}</span>
                            )}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search2Page;
