import React from "react";

type Props = {
    activeUsers: string[];
};

export const ActiveUsers: React.FC<Props> = ({ activeUsers }) => {
    return (
        <div className="col-span-full bg-white p-4 rounded-lg shadow-lg">
            <div className="text-xl font-bold">Active Users</div>
            {activeUsers.map((user) => (
                <span key={user} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {user}
                </span>
            ))}
        </div>
    );
};
