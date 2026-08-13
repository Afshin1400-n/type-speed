"use client";
import { useMemo } from "react";

interface Record {
  id: number;
  word: string;
  time: number;
  date: string;
  length: number;
}

interface RecordsProps {
  records: Record[];
}

function Records({ records }: RecordsProps) {
  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => a.time - b.time);
  }, [records]);

  const topThree = sortedRecords.slice(0, 3);

  if (topThree.length === 0) {
    return (
      <div className="text-center text-white/40 text-sm py-8">
        📭 هنوز رکوردی ثبت نشده است
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {topThree.map((record, index) => (
        <div
          key={record.id}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 
          flex items-center gap-3 hover:bg-white/10 transition-all duration-200"
        >
          <span className="text-2xl">
            {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white/90 text-base">
                {record.time.toFixed(1)}s
              </span>
              <span className="text-white/70 text-lg truncate font-medium">
                "{record.word}"
              </span>
              <span className="text-white/40 text-xs mr-auto">
                {record.date}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Records;