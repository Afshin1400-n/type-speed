"use client";
import { forwardRef } from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  colors: string[];
  word: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, disabled, colors, word }, ref) => {
    return (
      <div className="space-y-5">
        <div className="flex gap-1 justify-center">
          {word.split("").map((letter, index) => (
            <span
              key={index}
              className="w-8 h-10 flex items-center justify-center text-xl font-bold border-b-2 transition-all duration-200"
              style={{
                borderBottomColor: colors[index] === "green" ? "#22c55e" : 
                                   colors[index] === "red" ? "#ef4444" : "rgba(255,255,255,0.2)",
                color: colors[index] === "green" ? "#22c55e" : 
                       colors[index] === "red" ? "#ef4444" : "rgba(255,255,255,0.8)",
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
          placeholder="کلمه را تایپ کن..."
          disabled={disabled}
          className="w-full px-4 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg 
          text-white/90 text-center text-lg outline-none transition-all duration-200
          placeholder:text-white/80 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20
          disabled:opacity-80 disabled:cursor-not-allowed"
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;