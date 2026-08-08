"use client";
import { useState, useRef, useEffect, useMemo} from "react";
import Btn from "./component/Btn";
import Timer from "./component/Timer";
import Word from "./component/Word";
import Input from "./component/Input";
import { random } from 'word-lib';
import { log } from "node:console";

export default function Home() {
  // ✅ Stateها اینجا تعریف میشن
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef(null);
  const focusRef = useRef(null);
  const [word ,setWord] =useState("");
  const [inputValue ,setInputValue] =useState("");
  const [isDisable, setisDisable] = useState(true);
  const [records, setRecords] = useState([]);
  const [colors, setColors] = useState("gray");



 // تابع تولید کلمه جدید
  const generateNewWord = () => {
    const newWord = random({ maxLength: 5 });
    setWord(newWord);
  };

  useEffect(() => {
    generateNewWord();
    setisDisable(true);
    setIsFinished(false);
    setIsRunning(false)
    console.log(records);
    
  }, []);

  // ✅ توابع کنترل تایمر اینجا تعریف میشن
  const startTimer = () => {
  if (isRunning || isFinished) return; // ← اگه در حال اجرا یا تموم شده، کاری نکن
  
  setIsRunning(true);
  setIsFinished(false); // ← مطمئن شو finished false هست
  setisDisable(false);

    const startTime = Date.now() - time;

    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 10);

setTimeout(() => {
      if (focusRef.current) {
        focusRef.current.focus();
      }
    }, 50); 

  };


const stopTimer = () => {
  clearInterval(intervalRef.current);
  setIsRunning(false);
  setisDisable(true);
};
const resetTimer = () => {
  clearInterval(intervalRef.current);
  setIsRunning(false);
  setIsFinished(false); // ← مهم
  setTime(0);
  setInputValue("");
  generateNewWord();
  setisDisable(true);
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

    const addRecord = (word, time) => {
  const newRecord = {
    id: Date.now(),
    word: inputValue,
    time: time,
    date: new Date().toLocaleDateString("fa-IR")
  };
  setRecords([newRecord, ...records]); // ← جدیدترین اول
};

const sortedRecords = useMemo(() => {
  return [...records].sort((a, b) => a.time - b.time);
}, [records]);

useEffect(() => {

inputValue.split("").map((letter, index) => {
    if (letter === word[index]){
       setColors("green");
    } else{
 setColors("red") ;
    }
  });
if (inputValue === word && word !== "") {
    stopTimer();
    setIsFinished(true); 
    
    const timeInSeconds = time / 1000; // تبدیل میلی‌ثانیه به ثانیه
    addRecord(word, timeInSeconds);
    
  }
  
}, [inputValue, word]);

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
    ref={focusRef} 
  value={inputValue} 
  onChange={setInputValue}
  disabled={isDisable}
  colors ={colors}
/>

        {/* ✅ دکمه‌ها - دریافت توابع به‌صورت props */}
        <Btn
          startTimer={startTimer}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          isRunning={isRunning}
        
        />

        {/* رکوردها */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
  {sortedRecords.map((record) => (
    <div key={record.id} className="bg-gradient-to-r from-amber-50 to-amber-100/50 p-3 rounded-xl border border-amber-200 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-xl">🏆</span>
        <span className="font-semibold text-gray-700">{record.time} ثانیه</span>
      </div>
      <span className="text-sm text-gray-500">"{record.word}"</span>
      <span className="text-xs text-gray-400">{record.date}</span>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}