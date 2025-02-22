import React from "react";

type Props = {
    onSelect: (value: number) => void;
};

const fibonacciNumbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];

export const NumberSelection: React.FC<Props> = ({ onSelect }) => {
    return (
        <div className="col-span-full text-center">
            {fibonacciNumbers.map((num) => (
                <button
                    key={num}
                    onClick={() => onSelect(num)}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold m-1 py-4 px-6 border border-gray-400 rounded shadow"
                >
                    {num}
                </button>
            ))}
        </div>
    );
};
