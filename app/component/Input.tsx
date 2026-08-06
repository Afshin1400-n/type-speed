"use client";

function Input({ ref ,value, onChange, disabled  }) {
  return (
    <div className="mb-6">
      <label className="text-gray-600 text-sm block mb-2">
        📝 کلمه را تایپ کن:
      </label>
      <input
      ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="کلمه را اینجا بنویس..."
        disabled={disabled}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}

export default Input;