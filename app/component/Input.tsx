"use client";

function Input({ ref ,value, onChange, disabled , colors}) {
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
       className={`w-full px-4 py-3 border-4 border-${colors}-500 rounded-xl 
         transition-all outline-none text-lg text-gray-600 disabled:opacity-50
         disabled:cursor-not-allowed`}
      />
    </div>
  );
}

export default Input;