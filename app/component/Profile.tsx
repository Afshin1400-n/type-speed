"use client";

interface User {
  username: string;
  password: string;
}

interface ProfileProps {
  user: User | null;
  handleLogout: () => void;
}

function Profile({ user, handleLogout }: ProfileProps) {
  return (
    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg">
      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
        {user?.username?.charAt(0).toUpperCase() || "?"}
      </div>
      <span className="text-white/90 text-sm font-medium truncate max-w-[100px]">
        {user?.username || "مهمان"}
      </span>
      <button
        onClick={handleLogout}
        className="text-white/60 hover:text-red-400 hover:bg-red-500/20
         rounded-full px-3 py-1 text-sm font-medium transition-all duration-200 border
          border-white/10 hover:border-red-400/30 cursor-pointer"
      >
        🚪 خروج
      </button>
    </div>
  );
}

export default Profile;