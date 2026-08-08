"use client"

function Word({word}) {
  return (
     <div className="bg-indigo-50 rounded-xl p-4 mb-6 text-center border-2 border-dashed border-indigo-200">
          <span className="text-gray-500 text-md block mb-1">
            کلمه مورد نظر:
          </span>
          <span className="text-2xl font-bold text-indigo-700 tracking-wider">
            {word}
          </span>
        </div>
  )
}

export default Word