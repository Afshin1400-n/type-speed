"use client";

function Btn({ startTimer, stopTimer, resetTimer, isRunning }) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      <button
        onClick={startTimer}
        disabled={isRunning}
        className="bg-green-500 hover:bg-green-600 active:scale-95 
          text-white font-bold py-3 px-4 rounded-xl
          transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ▶ شروع
      </button>

      <button
        onClick={stopTimer}
        disabled={!isRunning}
        className="bg-yellow-500 hover:bg-yellow-600 active:scale-95 
          text-white font-bold py-3 px-4 rounded-xl 
          transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ⏸ توقف
      </button>

      <button
        onClick={resetTimer}
        className="bg-red-500 hover:bg-red-600 active:scale-95 
          text-white font-bold py-3 px-4 rounded-xl 
          transition-all shadow-md hover:shadow-lg"
      >
        🔄 ریست
      </button>
    </div>
  );
}

export default Btn;