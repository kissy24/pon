import React from "react";
import { User } from "lucide-react";

interface ActiveUsersProps {
    activeUsers: string[];
}

export const ActiveUsers: React.FC<ActiveUsersProps> = ({ activeUsers }) => {
    return (
        <div className="space-y-2">
            {activeUsers.length === 0 ? (
                <p className="text-gray-400">No active users</p>
            ) : (
                activeUsers.map((user, index) => (
                    <div key={index} className="flex items-center bg-gray-800 p-2 rounded-md shadow-sm">
                        <User className="w-5 h-5 text-gray-300 mr-2" />
                        <span className="text-white">{user}</span>
                    </div>
                ))
            )}
        </div>
    );
};

export default ActiveUsers;
