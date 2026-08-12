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
  const [word, setWord] = useState("؟");
  const [inputValue, setInputValue] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [records, setRecords] = useState([]);
  const [colors, setColors] = useState([]);
  const [wordLength, setWordLength] = useState(3);
  const [filterLength, setFilterLength] = useState(null);

  // بارگذاری از localStorage
  useEffect(() => {
    const savedRecords = localStorage.getItem("records");
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
  }, []);

  // ذخیره در localStorage
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem("records", JSON.stringify(records));
    }
  }, [records]);

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
    generateNewWord(wordLength);
  }, []);

  const startTimer = () => {
    if (isRunning || isFinished) return;
    generateNewWord(wordLength);
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
    setIsFinished(true);
    setIsDisable(true);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsFinished(false);
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

  const filteredRecords = useMemo(() => {
    if (filterLength === null) return records;
    return records.filter((record) => record.word.length === filterLength);
  }, [records, filterLength]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 gap-4">
      <Level
        handleLenWord={handleLenWord}
        wordLength={wordLength}
        isRunning={isRunning}
        isFinished={isFinished}
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