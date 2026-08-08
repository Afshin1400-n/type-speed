"use client";
import { forwardRef } from "react";

const Input = forwardRef(({ value, onChange, disabled, colors, word }, ref) => {
    console.log("Input disabled:", disabled); // ← ب
  return (
    <div className="mb-6">
      <label className="text-gray-600 text-sm block mb-2">
        📝 کلمه را تایپ کن:
      </label>
      <div className="flex gap-1 justify-center mb-2">
        {word.split("").map((letter, index) => (
          <span
            key={index}
            className="w-10 h-12 flex items-center justify-center text-2xl font-bold border-b-4 transition-all"
            style={{
              borderBottomColor: colors[index] === "green" ? "#22c55e" : 
                                 colors[index] === "red" ? "#ef4444" : "#d1d5db",
              color: colors[index] === "green" ? "#22c55e" : 
                     colors[index] === "red" ? "#ef4444" : "#1f2937",
              backgroundColor: colors[index] === "green" ? "#dcfce7" : 
                               colors[index] === "red" ? "#fee2e2" : "transparent"
            }}
          >
            {value[index] || "_"}
          </span>
        ))}
      </div>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="کلمه را اینجا بنویس..."
        disabled={disabled}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
});

Input.displayName = "Input";
export default Input;