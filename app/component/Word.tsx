"use client";

interface WordProps {
  word: string;
}

function Word({ word }: WordProps) {
  return (
    <div className="text-center">
      <span className="text-3xl font-bold text-white/90 tracking-wider">
        {word}
      </span>
    </div>
  );
}

export default Word;