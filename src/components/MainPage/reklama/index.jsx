import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import './reklama.module.css'; // CSS faylini import qilish

const ReklamaPage = () => {
    const [adText, setAdText] = useState('');
    const [is12, setIs12] = useState(false);
    const [is24, setIs24] = useState(false);
    const [pingEnabled, setPingEnabled] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const adData = {
            text: adText,
            is_12: is12,
            is_24: is24,
            is_ping: pingEnabled,
        };

        // API ga ma'lumotlarni yuborish
        console.log('Yuborilayotgan ma\'lumotlar:', adData);

        // APIga yuborish
        fetch('https://taxibuxoro.pythonanywhere.com/reklama/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Formani tozalash
            setAdText('');
            setIs12(false);
            setIs24(false);
            setPingEnabled(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container">
            <h1>Reklama berish</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Reklama matni:
                        <textarea
                            value={adText}
                            onChange={(e) => setAdText(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        12 soat ichida 6 marta reklama berish:
                        <Switch className='switch'
                            checked={is12}
                            onChange={(e) => setIs12(e.target.checked)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        24 soat ichida 12 marta reklama berish:
                        <Switch className='switch'
                            checked={is24}
                            onChange={(e) => setIs24(e.target.checked)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Telegram kanalda ping bo'lib tursinmi?
                        <Switch className='switch'
                            checked={pingEnabled}
                            onChange={(e) => setPingEnabled(e.target.checked)}
                        />
                    </label>
                </div>
                <button type="submit">Yuborish</button>
            </form>
        </div>
    );
};

export default ReklamaPage;
