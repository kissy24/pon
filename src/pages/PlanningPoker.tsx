import React from "react";
import { useLocation } from "react-router-dom";
import { useWebSocket } from "../hooks/useWebSocket";
import { AverageDisplay } from "../components/AverageDisplay";
import { ActiveUsers } from "../components/ActiveUsers";
import { NumberSelection } from "../components/NumberSelection";
import { SelectionsTable } from "../components/SelectionsTable";
import { Users } from "lucide-react";
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
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <main className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="grid grid-cols-3 gap-8">
                        <NumberSelection onSelect={(value) => sendMessage({ type: "select-number", data: { username, value } })} />
                        <SelectionsTable selections={selections} onClear={() => sendMessage({ type: "clear-selections" })} />
                        <AverageDisplay average={calculateAverage()} />
                    </div>
                </main>
                <aside className="w-64 bg-gray-600 text-white p-4 shadow-lg flex flex-col">
                    <h2 className="text-lg font-bold mb-4 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Active Users
                    </h2>
                    <ActiveUsers activeUsers={activeUsers} />
                </aside>
            </div>
        </div>
    );
};

export default PlanningPoker;
