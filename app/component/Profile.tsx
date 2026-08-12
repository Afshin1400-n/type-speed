

function Profile({user , handleLogout}) {


  return (
      <aside className="w-48 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-white/20 h-fit flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.username?.charAt(0).toUpperCase() || "?"}
          </div>
          <h3 className="font-bold text-gray-800 text-center truncate w-full">
            {user?.username || "کاربر مهمان"}
          </h3>
          <button
            onClick={handleLogout}
            className="w-full mt-2 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            🚪 خروج
          </button>
        </aside>
  )
}

export default Profile