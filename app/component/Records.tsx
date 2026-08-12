"use client";
import {useMemo} from "react";

function Records({ records }) {

const sortedRecords = useMemo(() => {
  return [...records].sort((a, b) => a.time - b.time);
}, [records]);

  const topThree = sortedRecords.slice(0, 3);

  if (topThree.length === 0) {
    return (
      <div className="text-center text-gray-400 py-4">
        هنوز رکوردی ثبت نشده است
      </div>
    );
  }

  return (
    <div className="space-y-3 max-full overflow-y-auto mt-8">
      {topThree.map((record, index) => (
        <div
          key={record.id}
          className="bg-gradient-to-r from-amber-50 to-amber-100/50 p-4 rounded-xl border border-amber-200
          flex items-center  gap-2"
        >
          <span className="text-2xl">
            {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
          </span>
          <span className="font-semibold text-gray-700 text-base">
            {record.time} ثانیه
          </span>
          <span className="text-sm text-gray-500">"{record.word}"</span>
          <span className="text-xs text-gray-400">{record.date}</span>
        </div>
      ))}
    </div>
  );
}

export default Records;