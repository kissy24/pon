import React from "react";

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
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-lg">
            <div className="text-xl font-bold">Selections</div>
            <table className="border-collapse border-none w-full text-m text-left rtl:text-right text-gray-500 font-bold">
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
            <button onClick={onClear} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Clear
            </button>
        </div>
    );
};
