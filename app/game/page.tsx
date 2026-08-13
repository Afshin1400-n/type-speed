// app/page.tsx
"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import Btn from "../component/Btn";
import Timer from "../component/Timer";
import Word from "../component/Word";
import Input from "../component/Input";
import { random } from "word-lib";
import Records from "../component/Records";
import Level from "../component/Level";
import { useRouter } from "next/navigation";
import Profile from "../component/Profile";

export default function Home() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef(null);
  const focusRef = useRef(null);
  const [word, setWord] = useState("؟");
  const [inputValue, setInputValue] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [records, setRecords] = useState([]);
  const [colors, setColors] = useState([]);
  const [wordLength, setWordLength] = useState(3);
  const [filterLength, setFilterLength] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isStop, setIsStop] = useState(false);
  
  
  

useEffect(() => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    setUser(JSON.parse(currentUser));
  }
}, []);

const handleLogout = () => {
  localStorage.removeItem("currentUser");
  router.push("/");
};



  // بارگذاری از localStorage
useEffect(() => {
  if (!user) return;
  const savedRecords = localStorage.getItem(`records_${user.username}`);
  if (savedRecords) {
    try {
      const parsed = JSON.parse(savedRecords);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setRecords(parsed);
      }
    } catch (error) {
      console.error("خطا در parse کردن records:", error);
    }
  }
}, [user]);

  // ذخیره در localStorage
useEffect(() => {
  if (!user || records.length === 0) return;
  localStorage.setItem(`records_${user.username}`, JSON.stringify(records));
}, [records, user]);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.disabled = isDisable;
    }
  }, [isDisable]);

  const generateNewWord = (len) => {
    let newWord = random({ maxLength: len });
    while (newWord.length !== len) {
      newWord = random({ maxLength: len });
    }
    setWord(newWord);
  };

  useEffect(() => {
    setIsDisable(true);
    setIsFinished(false);
    setIsRunning(false);
   
  }, []);

const startTimer = () => {
  if (isRunning) return;

  // ✅ فقط اگه کلمه "؟" هست یا بازی تموم شده، کلمه جدید تولید کن
  if (word === "؟" || isFinished) {
    generateNewWord(wordLength);
  }
  
  setIsRunning(true);
  setIsFinished(false); // ← این مهمه!
  setIsDisable(false);

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
    setIsStop(true)
    setIsDisable(true);
  };

const resetTimer = () => {
  clearInterval(intervalRef.current);
  setIsStop(false)
  setIsRunning(false);
  setIsFinished(false); // ← درسته
  setTime(0);
  setInputValue("");
  setWord("؟");
  setIsDisable(true);
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

const addRecord = (word, time, length) => {
  const newRecord = {
    id: Date.now(),
    word: word,
    time: time,
    date: new Date().toLocaleDateString("fa-IR"),
    length: length,
  };
  setRecords([newRecord, ...records]);
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
    
    const bestTime = getBestTimeForLength(wordLength);
    addRecord(word, timeInSeconds, wordLength);
    
    if (timeInSeconds < bestTime) {
      setMessage(`🎉 رکورد جدید! ${timeInSeconds} ثانیه`);
      setTimeout(() => setMessage(""), 3000);
    }
  }
}, [inputValue, word]);

  const handleLenWord = (e) => {
    const val = e.target.innerText.trim();
    if (val === "۳ حرفی") {
      setWordLength(3);
    } else if (val === "۵ حرفی") {
      setWordLength(5);
    } else if (val === "۷ حرفی") {
      setWordLength(7);
    }
  };

  const filteredRecords = useMemo(() => {
    if (filterLength === null) return records;
    return records.filter((record) => record.word.length === filterLength);
  }, [records, filterLength]);

const getBestTimeForLength = (length) => {
  const filtered = records.filter(r => r.length === length);
  if (filtered.length === 0) return Infinity;
  return Math.min(...filtered.map(r => r.time));
};


  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center
     justify-center p-4 gap-4">

  {/* پروفایل کاربر - سمت چپ */}
  <Profile user={user} handleLogout={handleLogout}/>

      <Level
        handleLenWord={handleLenWord}
        wordLength={wordLength}
        isRunning={isRunning}
        isFinished={isFinished}
        isStop={isStop}
      />

      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20 max-h-[90vh] overflow-y-auto">
        <h1 className="text-2xl sm:text-2xl font-bold text-center text-gray-800 mb-2">
          ⌨️ تایپ سریع
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          کلمه را در زمان مشخص تایپ کن!
        </p>

        <Word word={word} suppressHydrationWarning />
        <Timer time={time} formatTime={formatTime} suppressHydrationWarning />
        {message && (
  <div className="text-center text-green-600 font-bold text-lg animate-pulse my-2">
    {message}
  </div>
)}
        <Input
          ref={focusRef}
          value={inputValue}
          onChange={setInputValue}
          disabled={isDisable}
          colors={colors}
          word={word}
          suppressHydrationWarning
        />
        <Btn
          startTimer={startTimer}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          isRunning={isRunning}
        />
      </div>

      <aside className="w-72 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-white/20 h-fit max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold text-gray-700 mb-3 text-center">
          🏆 بهترین‌ها
        </h2>
        <div className="flex gap-2 justify-center mt-4 flex-wrap">
          <button
            onClick={() => setFilterLength(null)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              filterLength === null
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            همه
          </button>
          <button
            onClick={() => setFilterLength(3)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              filterLength === 3
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ۳ حرفی
          </button>
          <button
            onClick={() => setFilterLength(5)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              filterLength === 5
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ۵ حرفی
          </button>
          <button
            onClick={() => setFilterLength(7)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              filterLength === 7
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ۷ حرفی
          </button>
        </div>
        <Records records={filteredRecords} suppressHydrationWarning />
      </aside>
    </div>
  );
}