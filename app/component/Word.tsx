"use client"

function Word({word}) {
  return (
    <div className="text-center mt-2 mb-2">
      <span className="text-3xl font-bold text-white/90 tracking-wider">
        {word}
      </span>
    </div>
  )
}

export default Word