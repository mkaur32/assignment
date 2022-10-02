import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import type { GameData } from '../types'

import style from './Games.module.css'

export default function Games() {
  const navigate = useNavigate()
  const [games] = useLocalStorage<GameData[]>('games', [])

  return (
    <>
      <h1 className={style.header}>Previous Games</h1>
      {games.map(({ date, result }, index) => {
        const d = new Date(date)
        return (
          <div className={style.list} key={`game-${index}`}>
            <p className={style.title}>
              Game #{index + 1} @{d.toLocaleDateString()} - {result}
            </p>
            <button
              className={style.button}
              onClick={() => navigate(`/game-log/${d.getTime()}`)} // use timestamp as id
            >
              View game log
            </button>
          </div>
        )
      })}
    </>
  )
}
