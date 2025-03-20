import React from "react";
import { Trash2, Target } from "lucide-react";

type UserSelection = {
    username: string;
    value: number;
};

type Props = {
    selections: UserSelection[];
    onClear: () => void;
};

export const SelectionsTable: React.FC<Props> = ({ selections, onClear }) => {
    return (
        <div className="col-span-2 bg-gray-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold mb-4 flex justify-center items-center">
                    <Target className="mr-2" /> Selections
                </h2>
                <button
                    onClick={onClear}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-transform transform hover:scale-105"
                >
                    <Trash2 className="w-4 h-4 mr-2" /> Clear
                </button>
            </div>
            <table className="border-collapse border-none w-full text-m text-left rtl:text-right text-gray-200 font-bold">
                <thead>
                    <tr>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Point</th>
                    </tr>
                </thead>
                <tbody>
                    {selections.map(({ username, value }) => (
                        <tr key={username}>
                            <td className="px-6 py-3">{username}</td>
                            <td className="px-6 py-3">{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div >
    );
};
