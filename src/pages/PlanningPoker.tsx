import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWebSocket } from "../hooks/useWebSocket";
import { AverageDisplay } from "../components/AverageDisplay";
import { ActiveUsers } from "../components/ActiveUsers";
import { NumberSelection } from "../components/NumberSelection";
import { SelectionsTable } from "../components/SelectionsTable";

export const PlanningPoker: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.username || "Anonymous";

    const { selections, activeUsers, sendMessage } = useWebSocket(username);

    const calculateAverage = () => {
        if (selections.length === 0) return null;
        return selections.reduce((sum, { value }) => sum + value, 0) / selections.length;
    };

    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-3 text-center pt-6">
                    <div className="text-2xl">Planing Poker Pon !</div>
                    <div className="text-l">Welcome, {username}</div>
                    <button onClick={() => navigate("/")} className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Leave
                    </button>
                </div>
                <NumberSelection onSelect={(value) => sendMessage({ type: "select-number", data: { username, value } })} />
                <ActiveUsers activeUsers={activeUsers} />
                <SelectionsTable selections={selections} onClear={() => sendMessage({ type: "clear-selections" })} />
                <AverageDisplay average={calculateAverage()} />
            </div>
        </div>
    );
};

export default PlanningPoker;