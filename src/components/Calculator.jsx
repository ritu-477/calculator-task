"use client";
import { useState } from "react";

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState(0);

    const buttons = [
        ["1", "2", "3", "+",
            "4", "5", "6", "-",
            "7", "8", "9", "*",
            "0", "/", "C", "="],
    ];

    const handleClick = (value) => {
        if (value === "=") {
            try {
                setResult(eval(input).toString());
                setInput("");
            } catch (error) {
                setResult("Error");
            }
        } else if (value === "C") {
            setInput("");
            setResult(0);
        } else {
            setInput((prevInput) => prevInput + value);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
                <h1 className="text-3xl font-bold text-black mb-6 text-center"> Calculator</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mt-6 text-center text-black">Result: <span className="text-black">{result}</span></h2>
                    <input type="text" value={input} readOnly className="w-full p-4 text-right text-white text-2xl font-medium bg-black rounded-lg shadow-sm border border-black" />
                </div>
                <div className="flex flex-wrap gap-3">
                    {buttons.flat().map((button, index) => (
                        <button key={index} onClick={() => handleClick(button)} className={`p-4 sm:min-w-20 min-w-16 text-white rounded-lg text-xl hover:bg-black transition-all duration-200 ${button === "C" ? "bg-red-600 hover:!bg-red-400" : button === "=" ? "bg-green-500 hover:!bg-green-600 col-span-2" : ["+", "-", "*", "/"].includes(button) ? "bg-blue-500 hover:!bg-blue-600" : "bg-gray-700 hover:bg-black"}`}>
                            {button}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calculator;