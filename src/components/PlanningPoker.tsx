import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const socket = new WebSocket("ws://localhost:4000");

const fibonacciNumbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];

type UserSelection = {
    username: string;
    value: number;
};

const PlanningPoker: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selections, setSelections] = useState<UserSelection[]>([]);
    const [activeUsers, setActiveUsers] = useState<string[]>([]);

    const username = location.state?.username || "Anonymous";

    useEffect(() => {
        // ログイン通知を送信
        const loginMessage = {
            type: "login",
            data: { username },
        };
        socket.send(JSON.stringify(loginMessage));

        // メッセージ受信時の処理
        const handleMessage = (event: MessageEvent) => {
            const parsed = JSON.parse(event.data);

            if (parsed.type === "update-selections") {
                setSelections(parsed.data);
            } else if (parsed.type === "active-users") {
                setActiveUsers(parsed.data);
            }
        };

        socket.addEventListener("message", handleMessage);

        return () => {
            // ログアウト通知を送信
            const logoutMessage = {
                type: "logout",
                data: { username },
            };
            socket.send(JSON.stringify(logoutMessage));

            socket.removeEventListener("message", handleMessage);
        };
    }, [username]);

    const handleSelect = (value: number) => {
        const message = {
            type: "select-number",
            data: { username, value },
        };
        socket.send(JSON.stringify(message));
    };

    const handleClear = () => {
        const message = { type: "clear-selections" };
        socket.send(JSON.stringify(message));
    };

    const handleBack = () => {
        navigate("/");
    };

    const calculateAverage = () => {
        if (selections.length < 2) return null;
        const total = selections.reduce((sum, { value }) => sum + value, 0);
        return (total / selections.length).toFixed(2);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-3 text-center pt-6">
                    <div className="text-2xl">Planing Poker Pon !</div>
                    <div className="text-l">Welcome, {username}</div>
                    <button
                        onClick={handleBack}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Leave
                    </button>
                </div>

                <div className="col-span-full text-center">
                    {fibonacciNumbers.map((num) => (
                        <button
                            key={num}
                            onClick={() => handleSelect(num)}
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold m-1 py-4 px-6 border border-gray-400 rounded shadow"
                        >
                            {num}
                        </button>
                    ))}
                </div>

                <div className="col-span-full bg-white p-2 rounded-lg shadow-lg">
                    <div className="m-2 text-xl">Active Users</div>
                    {activeUsers.map((user) => (
                        <span key={user} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{user}</span>
                    ))}
                </div>

                <div className="col-span-2 bg-white p-2 rounded-lg shadow-lg">
                    <div className="m-2 text-xl">Selections</div>
                    <table className="border-collapse border-none w-full text-m text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-m">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Point</th>
                            </tr>
                        </thead>
                        <tbody className="text-m">
                            {selections.map(({ username, value }) => (
                                <tr key={username}>
                                    <td className="px-6 py-3">{username}</td>
                                    <td className="px-6 py-3">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        onClick={handleClear}
                        className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Clear
                    </button>
                </div>

                <div className="col-span-1 bg-white p-2 rounded-lg shadow-lg">
                    <div className="m-2 text-xl">Average</div>
                    <div>
                        {selections.length >= 2 && <div className="text-center justify-center text-4xl p-8">{calculateAverage()}</div>}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PlanningPoker;
