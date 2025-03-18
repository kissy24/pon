import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export const Navbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <nav className="bg-gray-700 text-white p-4 flex justify-between items-center shadow-md">
            <div className="text-2xl font-bold">Planning Poker Pon</div>
            <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg transition"
            >
                <LogOut size={20} />
                <span>Leave</span>
            </button>
        </nav>
    );
};
