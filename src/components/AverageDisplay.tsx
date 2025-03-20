import React from "react";
import { ChartPie } from "lucide-react";

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
        <div className="col-span-1 bg-gray-600 p-6 rounded-xl shadow-lg text-white text-center">
            <h2 className="text-2xl font-bold mb-4 flex justify-center items-center"><ChartPie className="mr-2" />Average</h2>
            <div className="text-3xl font-extrabold">
                {average !== null ? average.toFixed(1) : "---"}
            </div>
            <div className={`text-8xl font-extrabold ${color}`}>{label}</div>
        </div>
    );
};

