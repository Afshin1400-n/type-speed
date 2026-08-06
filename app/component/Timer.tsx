"use client"
import { useRef , useState  } from "react"

function Timer() {

const [time, setTime] = useState(0) // زمان بر حسب میلی‌ثانیه
const [isRunning, setIsRunning] = useState(false) // وضعیت اجرا
const intervalRef = useRef(null)


const startTimer = () => {
  if (isRunning) return
  
  setIsRunning(true)
  const startTime = Date.now() - time // برای ادامه از زمان قبلی
  
  intervalRef.current = setInterval(() => {
    setTime(Date.now() - startTime)
  }, 10) // آپدیت هر ۱۰ میلی‌ثانیه
}

const stopTimer = () => {
  clearInterval(intervalRef.current)
  setIsRunning(false)
}

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const centiseconds = Math.floor((milliseconds % 1000) / 10)
  
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`
}

  return (
<div className="text-6xl font-mono font-bold text-indigo-600">
  {formatTime(time)}

<button onClick={startTimer}>sss</button>
  
</div>
  )
}

export default Timer