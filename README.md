# ⌨️ Speed Typing Game

A modern, fast-paced typing game built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.  
Test your typing speed, beat your records, and challenge yourself with words of different lengths!

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- 🔐 **User Authentication** — Simple register/login system using `localStorage`
- ⏱️ **Precise Timer** — Millisecond-accurate timer (10ms interval)
- 📏 **Multiple Word Lengths** — Practice with 3, 5, or 7-letter words
- 🏆 **Personal Records** — Tracks your best times per word length
- 🎨 **Modern UI** — Glassmorphism design with gradient backgrounds
- ✅ **Live Feedback** — Letter-by-letter color coding (green/red)
- 🎉 **Success Modal** — Celebration modal with new record detection
- 👤 **Profile System** — Each user has their own separate records
- 📱 **Responsive Design** — Works on desktop and mobile

---


## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **word-lib** | Random word generation |
| **localStorage** | Client-side data persistence |

---

## 📦 Installation

### Prerequisites

- Node.js **18+**
- npm / yarn / pnpm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/speed-typing-game.git

# 2. Navigate into the project
cd speed-typing-game

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev