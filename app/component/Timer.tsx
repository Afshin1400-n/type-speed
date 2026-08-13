"use client";
interface TimerProps {
  time: number;
  formatTime: (milliseconds: number) => string;
}

function Timer({ time, formatTime }: TimerProps) {
  return (
    <div className="text-center">
      <div className="font-mono font-bold text-3xl text-white/90 tracking-wider mt-2">
        {formatTime(time)}
      </div>
    </div>
  );
}

export default Timer;