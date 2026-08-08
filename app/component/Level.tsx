

function Level({handleLenWord , wordLength}) {
  return (
      <div className="flex gap-2 justify-center mb-4">
  <button
    onClick={(e) => handleLenWord(e)}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
      wordLength === 3
        ? "bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    ۳ حرفی
  </button>

  <button
    onClick={(e) => handleLenWord(e)}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
      wordLength === 5
        ? "bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    ۵ حرفی
  </button>

  <button
    onClick={(e) => handleLenWord(e)}
    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
      wordLength === 7
        ? "bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    ۷ حرفی
  </button>
</div>
  )
}

export default Level