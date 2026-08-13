"use client";
interface TimerProps {
  time: number;
  formatTime: (milliseconds: number) => string;
}

function Timer({ time, formatTime }: TimerProps) {
  return (
    <div className="text-center">
      <div className="font-mono font-bold text-2xl text-white/90 tracking-wider">
        {formatTime(time)}
      </div>
    </div>
  );
}

export default Timer;