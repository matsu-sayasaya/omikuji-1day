'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

type Fortune = {
  overall: number
  work: number
  love: number
  money: number
}

type Advice = {
  overall: string
  work: string
  love: string
  money: string
  encouragement: string
}

const encouragingMessages = [
  "あなたならできます。自分を信じて。",
  "一歩ずつ前進すれば、必ず目標に到達できます。",
  "今日という日を大切に。明日はさらに素晴らしい日になるでしょう。",
  "困難は成長のチャンス。乗り越える度に強くなれます。",
  "あなたの努力は必ず報われます。諦めないでください。",
];

export default function OmikujiPage() {
  const [fortune, setFortune] = useState<Fortune | null>(null)
  const [advice, setAdvice] = useState<Advice | null>(null)
  const [lastDrawDate, setLastDrawDate] = useState<string | null>(null)

  const canDraw = useCallback(() => {
    const today = new Date().toDateString()
    return lastDrawDate !== today
  }, [lastDrawDate])

  useEffect(() => {
    const storedDate = localStorage.getItem('lastDrawDate')
    setLastDrawDate(storedDate)
  }, [])

  useEffect(() => {
    drawFortune()
  }, [])

  const drawFortune = () => {
    if (canDraw()) {
      const newFortune: Fortune = {
        overall: Math.floor(Math.random() * 3) + 3,
        work: Math.floor(Math.random() * 3) + 3,
        love: Math.floor(Math.random() * 3) + 3,
        money: Math.floor(Math.random() * 3) + 3,
      }
      setFortune(newFortune)

      const newAdvice: Advice = {
        overall: getAdvice('overall', newFortune.overall),
        work: getAdvice('work', newFortune.work),
        love: getAdvice('love', newFortune.love),
        money: getAdvice('money', newFortune.money),
        encouragement: encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)],
      }
      setAdvice(newAdvice)

      const today = new Date().toDateString()
      localStorage.setItem('lastDrawDate', today)
      setLastDrawDate(today)
    }
  }

  const getAdvice = (category: keyof Fortune, score: number): string => {
    const advices = {
      overall: [
        '今日はあなたの魅力が輝く日です。自信を持って前進しましょう。',
        '素敵な出会いがあるかもしれません。心を開いて過ごしましょう。',
        '幸運に恵まれた一日です。感謝の気持ちを忘れずに。',
      ],
      work: [
        '新しいアイデアが生まれそうです。直感を大切にしてください。',
        'チームワークが成功をもたらします。協調性を発揮しましょう。',
        'キャリアアップのチャンスです。自信を持って挑戦してください。',
      ],
      love: [
        '心のつながりを大切にすることで、関係がより深まるでしょう。',
        '相手の気持ちを理解することで、愛が育まれます。',
        'ロマンスが花開く時期です。愛する人との時間を大切にしましょう。',
      ],
      money: [
        '直感を信じて行動することで、良い結果が得られるでしょう。',
        '予期せぬ幸運がありそうです。感謝の気持ちを忘れずに。',
        '金運が上昇中です。新しい挑戦が実を結ぶかもしれません。',
      ],
    }
    return advices[category][score - 3]
  }

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`text-2xl ${i < count ? 'text-pink-400' : 'text-gray-300'}`}>
          ★
        </span>
      ))
  }

  if (!fortune || !advice) return null

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marble-background.jpg-dU2JzRaop5xO4NFFuIwfGeCLj0VipE.jpeg"
        alt="Marble background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg shadow-2xl p-8 max-w-md w-full relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 relative">
          <span className="relative z-10 text-yellow-600">
            今日のあなたへ
          </span>
          <span className="absolute inset-0 z-0 text-yellow-600 blur-[2px]">
            今日のあなたへ
          </span>
        </h1>
        <div className="space-y-8">
          {(Object.keys(fortune) as Array<keyof Fortune>).map((key) => (
            <div key={key} className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold mb-3 text-gray-700 capitalize">{key}</h2>
              <div className="flex justify-between items-center mb-3">
                <div className="flex">{renderStars(fortune[key])}</div>
                <span className="text-sm font-bold text-gray-500">{fortune[key]}/5</span>
              </div>
              <p className="text-sm font-bold text-gray-600 leading-relaxed">{advice[key]}</p>
            </div>
          ))}
          {advice.encouragement && (
            <div className="mt-6 text-center">
              <p className="text-lg font-bold text-yellow-600 italic">{advice.encouragement}</p>
            </div>
          )}
        </div>
        {canDraw() ? (
          <button
            onClick={drawFortune}
            className="mt-8 w-full bg-gradient-to-r from-pink-300 to-pink-500 text-white font-bold py-3 px-6 rounded-full hover:from-pink-400 hover:to-pink-600 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            おみくじを引く
          </button>
        ) : (
          <p className="mt-8 text-center text-gray-600 font-bold">
            今日はすでにおみくじを引きました。また明日お越しください。
          </p>
        )}
      </div>
    </div>
  )
}

