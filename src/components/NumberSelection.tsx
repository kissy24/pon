import React, { useState } from "react";
import { Dice5 } from "lucide-react";

type Props = {
    onSelect: (value: number) => void;
};

const fibonacciNumbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];

export const NumberSelection: React.FC<Props> = ({ onSelect }) => {
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

    const handleSelect = (num: number) => {
        setSelectedNumber(num);
        onSelect(num);
    };

    return (
        <div className="col-span-full text-center bg-gray-600 p-6 rounded-xl shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4 flex justify-center items-center">
                <Dice5 className="mr-2" /> Select a Number
            </h2>

            <div className="flex space-x-2 overflow-x-auto scrollbar-hide px-2 py-2">
                {fibonacciNumbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => handleSelect(num)}
                        className={`py-3 px-5 rounded-lg text-lg font-semibold transition-all shadow-md border 
                            ${selectedNumber === num
                                ? "bg-blue-500 text-white border-blue-500 scale-110 shadow-lg"
                                : "bg-gray-800 text-white border-gray-800 hover:bg-gray-400 hover:scale-105"
                            }`}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
};
