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
        <div className="col-span-full text-center">
            <h2 className="text-lg font-semibold mb-4 flex justify-center items-center">
                <Dice5 className="w-5 h-5 mr-2" /> Select a Number
            </h2>

            <div className="flex space-x-2 overflow-x-auto scrollbar-hide px-2 py-2">
                {fibonacciNumbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => handleSelect(num)}
                        className={`py-3 px-5 rounded-lg text-lg font-semibold transition-all shadow-md border 
                            ${selectedNumber === num
                                ? "bg-blue-500 text-white border-blue-700 scale-110 shadow-lg"
                                : "bg-gray-900 text-white border-gray-700 hover:bg-gray-700 hover:scale-105"
                            }`}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
};
