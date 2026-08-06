"use client";
import { useState, useRef, useEffect } from "react";
import Btn from "./component/Btn";
import Timer from "./component/Timer";
import Word from "./component/Word";
import Input from "./component/Input";
import { random } from 'word-lib';

export default function Home() {
  // ✅ Stateها اینجا تعریف میشن
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [word ,setWord] =useState("");
  const [inputValue ,setInputValue] =useState("");



 // تابع تولید کلمه جدید
  const generateNewWord = () => {
    const newWord = random({ maxLength: 5 });
    setWord(newWord);
  };

  useEffect(() => {
    generateNewWord();
  }, []);

  // ✅ توابع کنترل تایمر اینجا تعریف میشن
  const startTimer = () => {
    if (isRunning) return;

    setIsRunning(true);
    const startTime = Date.now() - time;

    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    generateNewWord();
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(centiseconds).padStart(2, "0")}`;
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
        {/* عنوان */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          ⌨️ تایپ سریع
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          کلمه را در زمان مشخص تایپ کن!
        </p>

        {/* کلمه هدف */}
      <Word word={word}/>

        {/* ✅ تایمر - دریافت time و formatTime به‌صورت props */}
        <Timer time={time} formatTime={formatTime} />

        {/* اینپوت */}
    <Input 
  value={inputValue} 
  onChange={setInputValue}
  // disabled={!isRunning && !isFinished}
/>

        {/* ✅ دکمه‌ها - دریافت توابع به‌صورت props */}
        <Btn
          startTimer={startTimer}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          isRunning={isRunning}
        />

        {/* رکوردها */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">🏆 رکوردها</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              آخرین ۵
            </span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {/* رکوردها (همون کد قبلی) */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 p-3 rounded-xl border border-amber-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">🥇</span>
                <span className="font-semibold text-gray-700">۱۲ ثانیه</span>
              </div>
              <span className="text-sm text-gray-500">"پایتون"</span>
              <span className="text-xs text-gray-400">امروز</span>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 p-3 rounded-xl border border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">🥈</span>
                <span className="font-semibold text-gray-700">۱۵ ثانیه</span>
              </div>
              <span className="text-sm text-gray-500">"جاوااسکریپت"</span>
              <span className="text-xs text-gray-400">دیروز</span>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-3 rounded-xl border border-orange-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">🥉</span>
                <span className="font-semibold text-gray-700">۱۸ ثانیه</span>
              </div>
              <span className="text-sm text-gray-500">"ریکت"</span>
              <span className="text-xs text-gray-400">دیروز</span>
            </div>

            <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 flex justify-between items-center opacity-60">
              <div className="flex items-center gap-2">
                <span className="text-xl">۴</span>
                <span className="font-semibold text-gray-600">۲۲ ثانیه</span>
              </div>
              <span className="text-sm text-gray-400">"سی‌شارپ"</span>
              <span className="text-xs text-gray-300">۳ روز پیش</span>
            </div>

            <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 flex justify-between items-center opacity-60">
              <div className="flex items-center gap-2">
                <span className="text-xl">۵</span>
                <span className="font-semibold text-gray-600">۲۵ ثانیه</span>
              </div>
              <span className="text-sm text-gray-400">"گو"</span>
              <span className="text-xs text-gray-300">۴ روز پیش</span>
            </div>
          </div>

          <button className="w-full mt-3 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 py-2 rounded-lg transition-colors border border-dashed border-gray-200">
            🗑 پاک کردن همه رکوردها
          </button>
        </div>
      </div>
    </div>
  );
}