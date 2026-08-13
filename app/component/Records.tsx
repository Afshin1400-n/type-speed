"use client";
import { useMemo } from "react";

function Records({ records }) {
  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => a.time - b.time);
  }, [records]);

  const topThree = sortedRecords.slice(0, 3);

  if (topThree.length === 0) {
    return (
      <div className="text-center text-white/40 text-xs py-8">
        📭 هنوز رکوردی ثبت نشده است
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {topThree.map((record, index) => (
        <div
          key={record.id}
          className="bg-white/5 backdrop-blur-sm rounded-lg p-2.5 border border-white/10 
          flex items-center gap-2 hover:bg-white/10 transition-all duration-200"
        >
          <span className="text-lg">
            {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white/90 text-xs">
                {record.time.toFixed(1)}s
              </span>
              <span className="text-white/60 text-[10px] truncate">
                "{record.word}"
              </span>
            </div>
            <div className="text-white/30 text-[8px]">
              {record.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Records;