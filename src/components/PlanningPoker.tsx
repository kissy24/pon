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
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Planning Poker</h1>
            <h2>Welcome, {username}!</h2>

            <div style={{ margin: "20px 0" }}>
                {fibonacciNumbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => handleSelect(num)}
                        style={{ margin: "5px", padding: "10px 15px", fontSize: "16px" }}
                    >
                        {num}
                    </button>
                ))}
            </div>

            <div>
                <h3>Selections:</h3>
                <ul>
                    {selections.map(({ username, value }) => (
                        <li key={username}>
                            {username}: {value}
                        </li>
                    ))}
                </ul>
            </div>

            {selections.length >= 2 && <h3>Average: {calculateAverage()}</h3>}

            <div>
                <h3>Active Users:</h3>
                <ul>
                    {activeUsers.map((user) => (
                        <li key={user}>{user}</li>
                    ))}
                </ul>
            </div>

            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={handleClear}
                    style={{ margin: "5px", padding: "10px 20px", fontSize: "16px" }}
                >
                    Clear
                </button>
                <button
                    onClick={handleBack}
                    style={{ margin: "5px", padding: "10px 20px", fontSize: "16px" }}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default PlanningPoker;
