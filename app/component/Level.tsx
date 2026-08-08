"use client";


export default function Level({ handleLenWord, wordLength, isRunning, isFinished }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 w-32 h-fit">
      <h3 className="text-sm font-bold text-gray-700 mb-3">📏 طول کلمه</h3>
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={handleLenWord}
          disabled={isRunning || isFinished}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition w-full ${
            wordLength === 3
              ? "bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          ۳ حرفی
        </button>
        <button
          onClick={handleLenWord}
          disabled={isRunning || isFinished}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition w-full ${
            wordLength === 5
              ? "bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          ۵ حرفی
        </button>
        <button
          onClick={handleLenWord}
          disabled={isRunning || isFinished}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition w-full ${
            wordLength === 7
              ? "bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          ۷ حرفی
        </button>
      </div>
    </div>
  );
}