"use client";

function Btn({ startTimer, stopTimer, resetTimer, isRunning }) {
  return (
    <div className="flex gap-3">
      <button
        onClick={startTimer}
        disabled={isRunning}
      
        className="flex-1 px-3 py-2 bg-gradient-to-r from-green-400 to-emerald-400 
          hover:from-green-500 hover:to-emerald-500 active:scale-95 
          text-white font-bold text-lg rounded-lg
          transition-all duration-200 shadow-md hover:shadow-lg 
          disabled:opacity-40 cursor-pointer  disabled:hover:shadow-md"
      >
        ▶ شروع
      </button>

      <button
        onClick={stopTimer}
        disabled={!isRunning}
        className="flex-1 px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 
          hover:from-yellow-500 hover:to-orange-500 active:scale-95 
          text-white font-bold text-lg rounded-lg
          transition-all duration-200 shadow-md hover:shadow-lg 
          disabled:opacity-40 cursor-pointer disabled:hover:shadow-md"
      >
        ⏸ توقف
      </button>

      <button
      style={{ cursor: "pointer" }}
        onClick={resetTimer}
        className="flex-1 px-3 py-2 bg-gradient-to-r from-red-400 to-rose-400 
          hover:from-red-500 hover:to-rose-500 active:scale-95 
          text-white font-bold text-lg rounded-lg
          transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer "
      >
        🔄 ریست
      </button>
    </div>
  );
}

export default Btn;