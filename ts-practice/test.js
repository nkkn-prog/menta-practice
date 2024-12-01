import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const App = () => {
  // おみくじ用のデータ
  const fortunes = ['大吉', '中吉', '小吉', '吉', '末吉', '凶', '大凶']

  // 表示データを格納
  const [result, setResult] = useState('')

  // おみくじを引く処理
  const handleOmikujiButtonClick = () => {
    const num = Math.floor(Math.random() * fortunes.length)
    setResult(fortunes[num])
  }

  const handleResetButtonClick = () => {
    setResult('')
  }

  return (
    <>
      <h1>おみくじアプリ</h1>
      <p>今日の運勢は？</p>
      <p>{result}</p>
      <button onClick={handleOmikujiButtonClick}>おみくじを引く</button>
      <button onClick={handleResetButtonClick}>リセット</button>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
