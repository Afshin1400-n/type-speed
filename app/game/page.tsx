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
import SuccessModal from "../component/SuccessModal";

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
    const [showModal, setShowModal] = useState(false); // ✅ state برای مودال
  const [newRecordTime, setNewRecordTime] = useState(0); // ✅ زمان رکورد جدید

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
    if (isRunning || isFinished) return;

    if (word === "؟") {
      generateNewWord(wordLength);
    }

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
    setIsStop(true);
    setIsDisable(true);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsStop(false);
    setIsRunning(false);
    setIsFinished(false);
    setTime(0);
    setInputValue("");
    setWord("؟");
    setIsDisable(true);
    setShowModal(false); // ✅ بستن مودال
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

       setNewRecordTime(timeInSeconds); // ✅ ذخیره زمان

      if (timeInSeconds < bestTime) {
        setMessage(`🎉 رکورد جدید! ${timeInSeconds} ثانیه`);
        setTimeout(() => setMessage(""), 3000);
      }
 // ✅ نمایش مودال بعد از 500ms
      setTimeout(() => {
        setShowModal(true);
      }, 500);

    }
  }, [inputValue, word]);

// در app/page.tsx
const handleLenWord = (length) => {
  setWordLength(length);
};

  const filteredRecords = useMemo(() => {
    if (filterLength === null) return records;
    return records.filter((record) => record.word.length === filterLength);
  }, [records, filterLength]);

  const getBestTimeForLength = (length) => {
    const filtered = records.filter((r) => r.length === length);
    if (filtered.length === 0) return Infinity;
    return Math.min(...filtered.map((r) => r.time));
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Profile - Top Left */}
      <div className="absolute top-3 left-3 z-50">
        <Profile user={user} handleLogout={handleLogout} />
      </div>

      <div className="h-full w-full flex items-center justify-center pt-3">
        <div className="w-full max-w-7xl max-h-7xl grid grid-cols-12 gap-5 ">
          {/* Left Column - Level */}
          <div className="col-span-12 lg:col-span-2 flex lg:block items-center gap-3 mt-10">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 flex-1">
              <Level
                handleLenWord={handleLenWord}
                wordLength={wordLength}
                isRunning={isRunning}
                isFinished={isFinished}
                isStop={isStop}
              />
            </div>

            {/* Quick Stats - hidden on mobile, shown on desktop */}
          <div className="hidden lg:block bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 mt-7">
  <div className="text-center">
    <div className="text-white/60 text-xl font-semibold uppercase tracking-wider mb-6">
      📊 آمار سریع
    </div>
    <div className="space-y- text-white/80 text-lg">
      <div>🔤 {records.length} کلمه</div>
      <div>🏆 {records.length > 0 ? Math.min(...records.map(r => r.time)).toFixed(1) : "—"}s</div>
    </div>
  </div>
</div>
          </div>

          {/* Center - Main Game */}
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-4 border border-white/20 ">
              <div className="text-center mb-5">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  ⌨️ تایپ سریع
                </h1>
              </div>

              <div className="space-y-3">
                {/* Word Display */}
                <div className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                  <Word word={word} suppressHydrationWarning />
                </div>

                {/* Timer & Message Row */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-black/30 rounded-lg p-2 backdrop-blur-sm border border-white/10">
                    <Timer time={time} formatTime={formatTime} suppressHydrationWarning />
                  </div>
                  {message && (
                    <div className="flex-1">
                      <span className="block text-center px-3 py-1.5 bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold rounded-lg text-xs animate-pulse shadow-lg">
                        {message}
                      </span>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="bg-black/30 rounded-lg p-2 backdrop-blur-sm border border-white/10">
                  <Input
                    ref={focusRef}
                    value={inputValue}
                    onChange={setInputValue}
                    disabled={isDisable}
                    colors={colors}
                    word={word}
                    suppressHydrationWarning
                  />
                </div>

                {/* Buttons */}
                <div className="bg-black/30 rounded-lg p-2 backdrop-blur-sm border border-white/10">
                  <Btn
                    startTimer={startTimer}
                    stopTimer={stopTimer}
                    resetTimer={resetTimer}
                    isRunning={isRunning}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Records */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 h-full max-h-[calc(100vh-6rem)] overflow-y-auto">
              <h2 className="text-2xl font-bold text-center mb-10 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                🏆 رکوردها
              </h2>

              {/* Filter Buttons */}
              <div className="flex gap-4 justify-center mb-10 flex-wrap">
                <button
                  onClick={() => setFilterLength(null)}
                  className={`px-2 py-0.5 rounded-md text-xl cursor-pointer  font-semibold transition-all ${
                    filterLength === null
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-white/10 text-white/60 hover:bg-white/20 backdrop-blur-sm border border-white/10"
                  }`}
                >
                  همه
                </button>
                <button
                  onClick={() => setFilterLength(3)}
                  className={`px-2 py-0.5 rounded-md text-xl cursor-pointer font-semibold transition-all ${
                    filterLength === 3
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-white/10 text-white/60 hover:bg-white/20 backdrop-blur-sm border border-white/10"
                  }`}
                >
                  ۳
                </button>
                <button
                  onClick={() => setFilterLength(5)}
                  className={`px-2 py-0.5 rounded-md text-xl cursor-pointer  font-semibold transition-all ${
                    filterLength === 5
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-white/10 text-white/60 hover:bg-white/20 backdrop-blur-sm border border-white/10"
                  }`}
                >
                  ۵
                </button>
                <button
                  onClick={() => setFilterLength(7)}
                  className={`px-2 py-0.5 rounded-md text-xl cursor-pointer  font-semibold transition-all ${
                    filterLength === 7
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "bg-white/10 text-white/60 hover:bg-white/20 backdrop-blur-sm border border-white/10"
                  }`}
                >
                  ۷
                </button>
              </div>

              <Records records={filteredRecords} suppressHydrationWarning />

               {/* ✅ Success Modal */}

            </div>
          </div>
        </div>
      </div>
            <SuccessModal 
        isOpen={showModal} 
        onClose={resetTimer} 
        time={newRecordTime} 
        word={word}
      />
    </div>
  );
}