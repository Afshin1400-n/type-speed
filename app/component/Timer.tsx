"use client";

function Timer({ time, formatTime }) {
  return (
    <div className="text-center mt-2 mb-2">
      <div className="font-mono font-bold text-2xl text-white/90 tracking-wider">
        {formatTime(time)}
      </div>
    </div>
  );
}

export default Timer;