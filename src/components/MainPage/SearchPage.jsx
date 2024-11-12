import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SearchPage.module.css';


const SearchPage = () => {
    const [where, setWhere] = useState('toshkent');
    const [whereTo, setWhereTo] = useState('Samarqand');
    const [results, setResults] = useState([]);
    const [userId, setUserId] = useState(null);
    const [aniqlik, setAniqlik] = useState(false);
    const [getRequestData, setGetRequestData] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const response = await axios.get('https://samarqandtaksi.pythonanywhere.com/users/profile/', {
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
            const response = await axios.get(`https://samarqandtaksi.pythonanywhere.com/search/?where=${where}&whereTo=${whereTo}`);
            const filteredResults = response.data.filter(result => result.request_type === 'yolovchi_berish');
            setResults(filteredResults);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleShowPhoneNumber = async (requestId, index) => {
        const confirmOpen = window.confirm('Raqamni ko\'rishni istaysizmi? Balansingizdan 7500 ayriladi');
        if (confirmOpen) {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await axios.post('https://samarqandtaksi.pythonanywhere.com/getrequests/', {
                    user: userId,
                    request: requestId,
                    getrequest_type: 'yolovchi_olish',
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
                alert(`Telefon raqami pastdagi jadvalda chiqadi`);

                // Fetch getrequest data
                const getRequestResponse = await axios.get('https://samarqandtaksi.pythonanywhere.com/getrequests/', {
                    headers: { Authorization: `JWT ${token}` }
                });
                const getRequestData = getRequestResponse.data;

                // Fetch request data for each getrequest
                const requestDetails = await Promise.all(getRequestData.map(async (getRequest) => {
                    const requestResponse = await axios.get(`https://samarqandtaksi.pythonanywhere.com/requests/${getRequest.request}/`, {
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
        <>
            <div className={styles.container}>
                <form className={styles.form}>
                    <label className='form_label'>Qayerdan:</label>
                    <select value={where} onChange={(e) => setWhere(e.target.value)}>
                        <option value="toshkent">TOSHKENT</option>
                        <option value="bektemir">Bektemir</option>
                        <option value="mirzo-ulugbek">Mirzo Ulug'bek</option>
                        <option value="chilonzor">Chilonzor</option>
                        <option value="shayxontohur">Shayxontohur</option>
                        <option value="sergeli">Sergeli</option>
                        <option value="olmazor">Olmazor</option>
                        <option value="yashnobod">Yashnobod</option>
                        <option value="yunusobod">Yunusobod</option>
                        <option value="zafarabad">Zafarabad</option>
                        <option value="uch-uy-oltiariq-xongiz-chimyon-mindon">UCH UY OLTIARIQ XONGIZ CHIMYON MINDON</option>
                    </select>
                    <label>Qayerga:</label>
                    <select value={whereTo} onChange={(e) => setWhereTo(e.target.value)}>
                        <option value="samarqand">SAMARQAND</option>
                        <option value="bulungur">Bulung'ur</option>
                        <option value="jomboy">Jomboy</option>
                        <option value="narpay">Narpay</option>
                        <option value="oqdaryo">Oqdaryo</option>
                        <option value="payshanba">Payshanba</option>
                        <option value="pastdargom">Pastdarg'om</option>
                        <option value="tayloq">Tayloq</option>
                        <option value="urgut">Urgut</option>
                        <option value="sirdaryo">Sirdaryo</option>
                    </select>
                    <button onClick={handleSearch}>Qidirish</button>
                </form>
                <div className={styles.resultsContainer}>
                    {results.map((result, index) => (
                        <div key={index} className={styles.resultItem}>
                            <p>Qayerdan: {result.where} {result.tuman} {result.tuman2}</p>
                            <p>Qayerga: {result.whereTo} {result.tuman} {result.tuman2}</p>
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
        </>
    );
};

export default SearchPage;
