import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInput: React.FC = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim() === '') return;
        navigate('/poker', { state: { username } });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Planning Poker</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px' }}
                />
                <button
                    type="submit"
                    style={{ padding: '10px 20px', marginLeft: '10px', fontSize: '16px' }}
                >
                    Start
                </button>
            </form>
        </div>
    );
};

export default UserInput;
