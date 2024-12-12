import { Shippori_Mincho } from 'next/font/google'
import './globals.css'

const shipporiMincho = Shippori_Mincho({ 
  subsets: ['latin'],
  weight: ['400', '700'] // 400 (regular) と 700 (bold) のウェイトを追加
})

export const metadata = {
  title: '今日の運勢',
  description: 'エレガントなおみくじアプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={shipporiMincho.className}>{children}</body>
    </html>
  )
}

