import React from "react";
import { useLocation } from "react-router-dom";
import { useWebSocket } from "../hooks/useWebSocket";
import { AverageDisplay } from "../components/AverageDisplay";
import { ActiveUsers } from "../components/ActiveUsers";
import { NumberSelection } from "../components/NumberSelection";
import { SelectionsTable } from "../components/SelectionsTable";
import { Navbar } from "../components/Navbar";

export const PlanningPoker: React.FC = () => {
    const location = useLocation();
    const username = location.state?.username || "Anonymous";

    const { selections, activeUsers, sendMessage } = useWebSocket(username);

    const calculateAverage = () => {
        if (selections.length === 0) return null;
        return selections.reduce((sum, { value }) => sum + value, 0) / selections.length;
    };

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex items-center justify-center flex-grow">
                <div className="grid grid-cols-3 gap-8">
                    <NumberSelection onSelect={(value) => sendMessage({ type: "select-number", data: { username, value } })} />
                    <ActiveUsers activeUsers={activeUsers} />
                    <SelectionsTable selections={selections} onClear={() => sendMessage({ type: "clear-selections" })} />
                    <AverageDisplay average={calculateAverage()} />
                </div>
            </div>
        </div>
    );
};

export default PlanningPoker;
