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
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Let's Pon !</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <button type="submit" className="w-full bg-sky-500 text-white py-2 px-4 rounded-md shadow hover:bg-sky-600">
                        Start
                    </button>

                </form>
            </div>
        </div>
    );
};

export default UserInput;
