"use client";

interface LevelProps {
  handleLenWord: (length: number) => void;
  wordLength: number;
  isRunning: boolean;
  isFinished: boolean;
  isStop: boolean;
}

export default function Level({ handleLenWord, wordLength, isRunning, isFinished, isStop }: LevelProps) {
  const isDisabled = isRunning || isFinished || isStop;

  return (
    <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-lg 
    rounded-2xl px-4 py-3 border border-white/20">
      <span className="text-white/70 text-lg font-medium">📏 طول کلمه</span>
      <div className="flex flex-col gap-1.5 w-full">
        <button
          onClick={() => !isDisabled && handleLenWord(3)}
          className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-200 cursor-pointer w-full ${
            wordLength === 3
              ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg"
              : "text-white/60 hover:text-white hover:bg-white/10"
          } ${isDisabled ? "opacity-40" : ""}`}
        >
          ۳ حرفی
        </button>
        <button
          onClick={() => !isDisabled && handleLenWord(5)}
          className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-200 cursor-pointer w-full ${
            wordLength === 5
              ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg"
              : "text-white/60 hover:text-white hover:bg-white/10"
          } ${isDisabled ? "opacity-40" : ""}`}
        >
          ۵ حرفی
        </button>
        <button
          onClick={() => !isDisabled && handleLenWord(7)}
          className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-200 cursor-pointer w-full ${
            wordLength === 7
              ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg"
              : "text-white/60 hover:text-white hover:bg-white/10"
          } ${isDisabled ? "opacity-40" : ""}`}
        >
          ۷ حرفی
        </button>
      </div>
    </div>
  );
}