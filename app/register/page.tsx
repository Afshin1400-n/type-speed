// app/register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // اعتبارسنجی
    if (!username.trim() || !password.trim()) {
      setError("همه فیلدها را پر کنید");
      setLoading(false);
      return;
    }

    if (password.length < 4) {
      setError("رمز عبور باید حداقل ۴ کاراکتر باشد");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند");
      setLoading(false);
      return;
    }

    // گرفتن کاربران موجود از localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // چک کردن تکراری نبودن نام کاربری
    if (users.find(u => u.username === username)) {
      setError("این نام کاربری قبلاً ثبت شده است");
      setLoading(false);
      return;
    }

    // ذخیره کاربر جدید
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess(true);
    setLoading(false);

    // بعد از ۲ ثانیه به صفحه ورود برو
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          📝 ثبت‌نام
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          حساب کاربری جدید بسازید
        </p>

        {success ? (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-center">
            ✅ ثبت‌نام با موفقیت انجام شد!
            <br />
            <span className="text-sm">در حال انتقال به صفحه ورود...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                نام کاربری
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="نام کاربری خود را انتخاب کنید..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                رمز عبور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور خود را وارد کنید..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-gray-700"
                required
                minLength={4}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                تکرار رمز عبور
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="رمز عبور را دوباره وارد کنید..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-gray-700"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "⏳ در حال ثبت‌نام..." : "🚀 ثبت‌نام"}
            </button>
          </form>
        )}

        <p className="text-center text-gray-500 text-sm mt-6">
          قبلاً ثبت‌نام کردید؟{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            ورود
          </Link>
        </p>
      </div>
    </div>
  );
}