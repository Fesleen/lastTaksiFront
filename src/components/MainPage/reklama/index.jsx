import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import './reklama.module.css'; // CSS faylini import qilish

const ReklamaPage = () => {
    const [adText, setAdText] = useState('');
    const [rotationCount, setRotationCount] = useState(0);
    const [pingEnabled, setPingEnabled] = useState(false); // Ping uchun yangi state

    const handleSubmit = (e) => {
        e.preventDefault();

        const adData = {
            text: adText,
            rotations: rotationCount,
            ping: pingEnabled, // Ping holatini qo'shish
        };

        // API ga ma'lumotlarni yuborish
        console.log('Yuborilayotgan ma\'lumotlar:', adData);

        // API ga yuborish
        fetch('https://example.com/api/reklama', {
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
            setRotationCount(0);
            setPingEnabled(false); // Ping holatini tozalash
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleSwitchChange = (value, isChecked) => {
        setRotationCount(prevCount => {
            // Agar switch bosilsa, aylanma sonini qo'shadi, aks holda kamaytiradi
            const newCount = isChecked ? value : 0; // Agar switch o'chirilsa, 0 ga qaytadi
            return newCount; // Faqat bitta switch faqat bitta qiymatni olishi kerak
        });
    };

    const handlePingSwitchChange = (isChecked) => {
        setPingEnabled(isChecked); // Ping holatini yangilash
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
                            onChange={(e) => handleSwitchChange(6, e.target.checked)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        24 soat ichida 12 marta reklama berish:
                        <Switch className='switch'
                            onChange={(e) => handleSwitchChange(12, e.target.checked)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Telegram kanalda ping bo'lib tursinmi?
                        <Switch className='switch'
                            onChange={(e) => handlePingSwitchChange(e.target.checked)}
                        />
                    </label>
                </div>
                <button type="submit">Yuborish</button>
            </form>
        </div>
    );
};

export default ReklamaPage;