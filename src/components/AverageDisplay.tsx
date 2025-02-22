import React from "react";

type Props = {
    average: number | null;
};

const getLabel = (avg: number | null) => {
    if (avg === null) return { label: "", color: "text-gray-400" };
    if (avg < 5) return { label: "S", color: "text-blue-500" };
    if (avg < 21) return { label: "M", color: "text-green-500" };
    if (avg < 89) return { label: "L", color: "text-yellow-500" };
    return { label: "XL", color: "text-red-500" };
};

export const AverageDisplay: React.FC<Props> = ({ average }) => {
    const { label, color } = getLabel(average);

    return (
        <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg text-center">
            <div className="text-2xl font-bold text-gray-500">Average</div>
            <div className="text-3xl font-extrabold text-gray-700">
                {average !== null ? average.toFixed(1) : "---"}
            </div>
            <div className={`text-8xl font-extrabold ${color}`}>{label}</div>
        </div>
    );
};

