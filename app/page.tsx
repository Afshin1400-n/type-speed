// app/page.tsx
"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import Btn from "./component/Btn";
import Timer from "./component/Timer";
import Word from "./component/Word";
import Input from "./component/Input";
import { random } from "word-lib";
import Records from "./component/Records";
import Level from "./component/Level";

export default function Home() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef(null);
  const focusRef = useRef(null);
  const [word, setWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [records, setRecords] = useState([]);
  const [colors, setColors] = useState([]);
  const [wordLength, setWordLength] = useState(3);

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
    if (isRunning || isFinished) return;
generateNewWord(wordLength)
    setIsRunning(true);
    setIsFinished(false);
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
    setIsFinished(true)
    setIsDisable(true);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsFinished(false);
    setTime(0);
    setInputValue("");
    setWord("")
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

  const addRecord = (word, time) => {
    const newRecord = {
      id: Date.now(),
      word: word,
      time: time,
      date: new Date().toLocaleDateString("fa-IR"),
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
      addRecord(word, timeInSeconds);
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

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 gap-4">
      {/* Level - سمت چپ */}
<Level
  handleLenWord={handleLenWord}
  wordLength={wordLength}
  isRunning={isRunning}
  isFinished={isFinished}
/>

      {/* بخش اصلی - وسط */}
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl
       p-6 sm:p-8 border border-white/20 max-h-[90vh] ">
        <h1 className="text-2xl sm:text-2xl font-bold text-center text-gray-800 mb-2">
          ⌨️ تایپ سریع
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          کلمه را در زمان مشخص تایپ کن!
        </p>

        <Word word={word} />
        <Timer time={time} formatTime={formatTime} />
        <Input
          ref={focusRef}
          value={inputValue}
          onChange={setInputValue}
          disabled={isDisable}
          colors={colors}
          word={word}
        />
        <Btn
          startTimer={startTimer}
          stopTimer={stopTimer}
          resetTimer={resetTimer}
          isRunning={isRunning}
        />
      </div>

      {/* رکوردها - سمت راست */}
      <aside className="w-72 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-white/20 h-fit max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold text-gray-700 mb-3 text-center">
          🏆 بهترین‌ها
        </h2>
        <Records records={records} />
      </aside>
    </div>
  );
}