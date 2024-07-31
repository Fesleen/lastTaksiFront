import React, { useState } from 'react';
import axios from 'axios';
import styles from './Search2Page.module.css';

const Search2Page = () => {
    const [where, setWhere] = useState('TASHKENT');
    const [whereTo, setWhereTo] = useState('BAGHDAD-RISHTON-BUVAYDA');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://taksibot.pythonanywhere.com/search/?where=${where}&whereTo=${whereTo}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.inputContainer}>
                <label>
                    Where:
                    <select value={where} onChange={(e) => setWhere(e.target.value)}>
                        <option value="TASHKENT">TASHKENT</option>
                        <option value="BAGHDAD-RISHTON-BUVAYDA">BAGHDAD-RISHTON-BUVAYDA</option>
                        <option value="KOQAN">KOQAN</option>
                        <option value="UCHKOPRIK">UCHKOPRIK</option>
                    </select>
                </label>
                <label>
                    WhereTo:
                    <select value={whereTo} onChange={(e) => setWhereTo(e.target.value)}>
                        <option value="TASHKENT">TASHKENT</option>
                        <option value="BAGHDAD-RISHTON-BUVAYDA">BAGHDAD-RISHTON-BUVAYDA</option>
                        <option value="KOQAN">KOQAN</option>
                        <option value="UCHKOPRIK">UCHKOPRIK</option>
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
                        <p>Phone Number: {result.phone_number}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search2Page;
