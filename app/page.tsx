// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // گرفتن کاربران از localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      router.push("game");
    } else {
     setError("نام کاربری یا رمز عبور اشتباه است");
      setTimeout(() => {
setError("")     
 }, 2000);
    }
    setLoading(false);
   
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          🔐 ورود
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          برای ادامه وارد شوید
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              نام کاربری
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="نام کاربری خود را وارد کنید..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none text-gray-700"
              required
            />
          </div>

          <div className="mb-6">
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
            {loading ? "⏳ در حال ورود..." : "🚀 ورود"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          حساب کاربری ندارید؟{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            ثبت‌نام
          </Link>
        </p>
      </div>
    </div>
  );
}