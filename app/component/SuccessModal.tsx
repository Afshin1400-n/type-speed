// component/SuccessModal.tsx
"use client";

import { useEffect, useRef } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  time: number;
  word: string;
  isNewRecord?: boolean;
}

export default function SuccessModal({ isOpen, onClose, time, word, isNewRecord = false }: SuccessModalProps) {
  const okButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => okButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300">
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-8 max-w-md w-full mx-4 border border-white/20 shadow-2xl transform transition-all duration-300 scale-100 opacity-100">
        <div className="text-center mb-4">
          <div className="text-7xl animate-bounce">🎉</div>
        </div>

        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent mb-2">
          تبریک! 🥳
        </h2>

        <div className="text-center text-white/80 space-y-3 mb-6">
          <p className="text-lg">کلمه رو درست تایپ کردی!</p>
          
          <p className="text-sm text-white/60">
            کلمه: <span className="text-white font-bold">&quot;{word}&quot;</span>
          </p>
          
          <p className="text-sm text-white/60">
            زمان: <span className="text-green-400 font-bold">{time.toFixed(2)}</span> ثانیه
          </p>

          {/* ✅ پیام رکورد جدید */}
          {isNewRecord && (
            <div className="mt-4">
              <span className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold rounded-full text-sm animate-pulse shadow-lg">
                🏆 رکورد جدید! {time.toFixed(2)} ثانیه
              </span>
            </div>
          )}
        </div>

        <button
          ref={okButtonRef}
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onClose();
            }
          }}
          autoFocus
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 
          hover:from-purple-600 hover:to-pink-600 active:scale-95
          text-white font-bold rounded-xl transition-all duration-200 
          shadow-md hover:shadow-lg cursor-pointer"
        >
          ✅ اوکی، بازی جدید!
        </button>
      </div>
    </div>
  );
}