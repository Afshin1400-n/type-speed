export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">

        {/* عنوان */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          ⌨️ تایپ سریع
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">کلمه را در زمان مشخص تایپ کن!</p>

        {/* کلمه هدف */}
        <div className="bg-indigo-50 rounded-xl p-4 mb-6 text-center border-2 border-dashed border-indigo-200">
          <span className="text-gray-500 text-sm block mb-1">کلمه مورد نظر:</span>
          <span className="text-2xl font-bold text-indigo-700 tracking-wider">پایتون</span>
        </div>

        {/* تایمر */}
        <div className="text-center mb-6">
          <span className="text-gray-500 text-sm block mb-1">⏱️ زمان</span>
          <div className="text-6xl font-mono font-bold text-indigo-600 bg-indigo-50 rounded-xl py-3 px-4 inline-block min-w-[150px]">
            ۰۰:۳۰
          </div>
        </div>

        {/* اینپوت */}
        <div className="mb-6">
          <label className="text-gray-600 text-sm block mb-2">📝 کلمه را تایپ کن:</label>
          <input
            type="text"
            placeholder="کلمه را اینجا بنویس..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 
            focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-lg text-gray-600"
          />
        </div>

        {/* دکمه‌ها */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button className="bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg">
            ▶ شروع
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 active:scale-95 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg">
            ⏸ توقف
          </button>
          <button className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg">
            🔄 ریست
          </button>
        </div>

        {/* رکوردها */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">🏆 رکوردها</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">آخرین ۵</span>
          </div>

          {/* لیست رکوردها */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {/* رکورد ۱ */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 p-3 rounded-xl border border-amber-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">🥇</span>
                <span className="font-semibold text-gray-700">۱۲ ثانیه</span>
              </div>
              <span className="text-sm text-gray-500">"پایتون"</span>
              <span className="text-xs text-gray-400">امروز</span>
            </div>

            {/* رکورد ۲ */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 p-3 rounded-xl border border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">🥈</span>
                <span className="font-semibold text-gray-700">۱۵ ثانیه</span>
              </div>
              <span className="text-sm text-gray-500">"جاوااسکریپت"</span>
              <span className="text-xs text-gray-400">دیروز</span>
            </div>

            {/* رکورد ۳ */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-3 rounded-xl border border-orange-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">🥉</span>
                <span className="font-semibold text-gray-700">۱۸ ثانیه</span>
              </div>
              <span className="text-sm text-gray-500">"ریکت"</span>
              <span className="text-xs text-gray-400">دیروز</span>
            </div>

            {/* رکورد ۴ */}
            <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 flex justify-between items-center opacity-60">
              <div className="flex items-center gap-2">
                <span className="text-xl">۴</span>
                <span className="font-semibold text-gray-600">۲۲ ثانیه</span>
              </div>
              <span className="text-sm text-gray-400">"سی‌شارپ"</span>
              <span className="text-xs text-gray-300">۳ روز پیش</span>
            </div>

            {/* رکورد ۵ */}
            <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 flex justify-between items-center opacity-60">
              <div className="flex items-center gap-2">
                <span className="text-xl">۵</span>
                <span className="font-semibold text-gray-600">۲۵ ثانیه</span>
              </div>
              <span className="text-sm text-gray-400">"گو"</span>
              <span className="text-xs text-gray-300">۴ روز پیش</span>
            </div>
          </div>

          {/* دکمه پاک کردن */}
          <button className="w-full mt-3 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 py-2 rounded-lg transition-colors border border-dashed border-gray-200">
            🗑 پاک کردن همه رکوردها
          </button>
        </div>

      </div>
    </div>
  );
}