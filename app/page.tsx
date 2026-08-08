"use client";
import { useState, useRef, useEffect, useMemo} from "react";
import Btn from "./component/Btn";
import Timer from "./component/Timer";
import Word from "./component/Word";
import Input from "./component/Input";
import { random } from 'word-lib';
import Records from "./component/Records";


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
  const [colors, setColors] = useState([]);
  const [wordLength, setWordLength] = useState(3);

useEffect(() => {
  // وقتی isDisable تغییر میکنه، فوکوس رو ریست کن
  if (focusRef.current) {
    focusRef.current.disabled = isDisable;
  }
}, [isDisable]);

 // تابع تولید کلمه جدید
const generateNewWord = (len) => {
  let newWord = random({ maxLength: len });
  while (newWord.length !== len) {
    newWord = random({ maxLength: len });
  }
  setWord(newWord);
};

  useEffect(() => {
    generateNewWord(3);
    setisDisable(true);
    setIsFinished(false);
    setIsRunning(false);
 setWordLength(3);

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
  generateNewWord(wordLength);
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
    )}:${String(centiseconds).padStart(2, "0")}`;
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



useEffect(() => {
  const newColors = inputValue.split("").map((letter, index) => {
    if (letter === word[index]) return "green";
    return "red";
  });
  setColors(newColors);

  if (inputValue === word && word !== "") {
    stopTimer();
    setIsFinished(true);
    const timeInSeconds = time / 1000;
    addRecord(word, timeInSeconds);
  }
}, [inputValue, word]);

const handleLenWord = (e) => {
  const val = e.target.innerText.trim();
  
  if (val === "۳ حرفی") {
    generateNewWord(3);
    setWordLength(3)
  } else if (val === "۵ حرفی") {
    generateNewWord(5);
    setWordLength(5)
  } else if (val === "۷ حرفی") {
    generateNewWord(7);
    setWordLength(7)
  }
};


  return (
    <div className="max-h-[100vh] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center
     justify-center p-1 gap-1">

  <div className="flex gap-2 justify-center mb-4">
  <button
    onClick={(e) => handleLenWord(e)}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
      wordLength === 3
        ? "bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    ۳ حرفی
  </button>

  <button
    onClick={(e) => handleLenWord(e)}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
      wordLength === 5
        ? "bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    ۵ حرفی
  </button>

  <button
    onClick={(e) => handleLenWord(e)}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
      wordLength === 7
        ? "bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    ۷ حرفی
  </button>
</div>

      <div className=" ml-80 max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8
       border border-white/20">
        {/* عنوان */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          ⌨️ تایپ سریع
        </h1>
     

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
  colors={colors}
  word={word}
/>

        {/* ✅ دکمه‌ها - دریافت توابع به‌صورت props */}
        <Btn
          startTimer={startTimer}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          isRunning={isRunning}
        
        />


      </div>
      
        {/* رکوردها */}
 <aside className="ml-20 w-80 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-white/20 h-fit">
  <h2 className="text-lg font-bold text-gray-700 mb-3 text-center">🏆 بهترین‌ها</h2>
  <Records records={records} />
</aside>


    </div>
  );
}