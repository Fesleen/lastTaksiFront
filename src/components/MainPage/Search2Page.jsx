import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Search2Page.module.css';

const Search2Page = () => {
    const [where, setWhere] = useState('toshkent');
    const [whereTo, setWhereTo] = useState('qo\'qon');
    const [results, setResults] = useState([]);
    const [userId, setUserId] = useState(null);
    const [aniqlik, setAniqlik] = useState(false);
    const [getRequestData, setGetRequestData] = useState([]);
    const [requestData, setRequestData] = useState({});

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
        try {
            const response = await axios.get(`https://taksibot.pythonanywhere.com/search/?where=${where}&whereTo=${whereTo}`);
            const filteredResults = response.data.filter(result => result.request_type === 'pochta_berish');
            setResults(filteredResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleShowPhoneNumber = async (requestId, index) => {
        const confirmOpen = window.confirm('Raqamni ko\'rishni istaysizmi?');
        if (confirmOpen) {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await axios.post('https://taksibot.pythonanywhere.com/getrequests/', {
                    user: userId,
                    request: requestId,
                    getrequest_type: 'pochta_olish',
                }, {
                    headers: { Authorization: `JWT ${token}` }
                });

                const { phone_number } = response.data; // assuming response contains phone_number
                
                setResults((prevResults) =>
                    prevResults.map((result, idx) =>
                        idx === index ? { ...result, phone_number: phone_number } : result
                    )
                );

                setAniqlik(true); // Set aniqlik to true when the user confirms
                alert(`Telefon raqam: ${phone_number}`);

                // Fetch getrequest data
                const getRequestResponse = await axios.get('https://taksibot.pythonanywhere.com/getrequests/', {
                    headers: { Authorization: `JWT ${token}` }
                });
                const getRequestData = getRequestResponse.data;

                // Fetch request data for each getrequest
                const requestDetails = await Promise.all(getRequestData.map(async (getRequest) => {
                    const requestResponse = await axios.get(`https://taksibot.pythonanywhere.com/requests/${getRequest.request}/`, {
                        headers: { Authorization: `JWT ${token}` }
                    });
                    return { ...getRequest, phone_number: requestResponse.data.phone_number };
                }));

                setGetRequestData(requestDetails);

            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.inputContainer}>
                <label>
                    Qayerdan:
                    <select value={where} onChange={(e) => setWhere(e.target.value)}>
                        <option value="toshkent">TASHKENT</option>
                        <option value="bog'dod-rishton-buvayda">BAGHDAD-RISHTON-BUVAYDA</option>
                        <option value="qo'qon">KOQAN</option>
                        <option value="uchko'prik">UCHKOPRIK</option>
                    </select>
                </label>
                <label>
                    Qayerga:
                    <select value={whereTo} onChange={(e) => setWhereTo(e.target.value)}>
                        <option value="toshkent">TASHKENT</option>
                        <option value="bog'dod-rishton-buvayda">BAGHDAD-RISHTON-BUVAYDA</option>
                        <option value="qo'qon">KOQAN</option>
                        <option value="uchko'prik">UCHKOPRIK</option>
                    </select>
                </label>
                <button onClick={handleSearch}>Qidirish</button>
            </div>
            <div className={styles.resultsContainer}>
                {results.map((result, index) => (
                    <div key={index} className={styles.resultItem}>
                        <p>Qayerdan: {result.where}</p>
                        <p>Qayerga: {result.whereTo}</p>
                        <p>
                            Telefon Raqam: {aniqlik ? (
                                <span>{result.phone_number}</span>
                            ) : (
                                result.phone_number ? (
                                    <button 
                                        className={styles.showPhoneNumberButton} 
                                        onClick={() => handleShowPhoneNumber(result.id, index)}
                                    >
                                        telefon raqamni ko'rish
                                    </button>
                                ) : (
                                    <span>{result.phone_number}</span>
                                )
                            )}
                        </p>
                    </div>
                ))}
            </div>
            {getRequestData.length > 0 && (
                <div className={styles.getRequestTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Telefon Raqam</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getRequestData.slice(-1).map((request) => (
                                <tr key={request.id}>
                                    <td>{request.phone_number}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Search2Page;
