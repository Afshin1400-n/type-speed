"use client";

function Timer({ time, formatTime }) {
  return (
    <div className="text-center mb-6">
      <span className="text-gray-500 text-sm block mb-1">⏱️ زمان</span>
      <div className="text-6xl font-mono font-bold text-indigo-600 bg-indigo-50 rounded-xl py-3 px-4 inline-block min-w-[150px]">
        {formatTime(time)}
      </div>
    </div>
  );
}

export default Timer;