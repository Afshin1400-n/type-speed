"use client"

function Word({word}) {
  return (
    <div className="text-center">
      <span className="text-3xl font-bold text-white/90 tracking-wider">
        {word}
      </span>
    </div>
  )
}

export default Word