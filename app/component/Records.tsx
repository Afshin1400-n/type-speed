"use client";
import { useMemo } from "react";

function Records({ records }) {
  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => a.time - b.time);
  }, [records]);

  const topThree = sortedRecords.slice(0, 3);

  if (topThree.length === 0) {
    return (
      <div className="text-center text-white/80 text-lg py-8">
         هنوز رکوردی ثبت نشده است
      </div>
    );
  }

  return (
    <div className="space-y-10">
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
      <span className="font-bold text-white/90 text-base text-lg">
        {record.time.toFixed(1)}s
      </span>
      <span className="text-white/90 text-lg truncate font-medium">
        "{record.word}"
      </span>
      <span className="text-white/70 text-md mr-auto">
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