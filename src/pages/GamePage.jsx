import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { MODES } from '../modes.js'
import { compareRow } from '../utils/compareAttributes.js'

const GamePage = () => {
  const { modeId } = useParams()
  const navigate = useNavigate()
  const mode = MODES[modeId]

  const [guesses, setGuesses] = useState([])

  if (!mode) return <p>Unknown trial.</p>

  const answer = mode.candidates[0]   // fixed for now; daily pick comes later

  const rows = guesses.map((g) => compareRow(g, answer, mode.columns))
  const hasWon = guesses.some((g) => g.id === answer.id)
  const remaining = mode.candidates.filter((c) => !guesses.some((g) => g.id === c.id))

  const handleGuess = (event) => {
    const picked = mode.candidates.find((c) => c.id === event.target.value)
    if (picked) setGuesses((prev) => [...prev, picked])
  }
  return (
    <main className="game-page">
      <button onClick={() => navigate('/modes')}>← Trials</button>
      <h1>{mode.title}</h1>
      <p>{mode.subtitle}</p>

      <select value="" onChange={handleGuess} disabled={hasWon}>
        <option value="" disabled>{mode.placeholder}</option>
        {remaining.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {hasWon && <p>You found the {answer.name} in {guesses.length} guesses!</p>}

      <table>
        <thead>
          <tr>
            <th>Guess</th>
            {mode.columns.map((col) => <th key={col.key}>{col.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, i) => (
            <tr key={guesses[i].id}>
              <td>{guesses[i].name}</td>
              {cells.map((cell) => (
                <td key={cell.key} className={`cell cell--${cell.status}`}>
                  {Array.isArray(cell.text)
                    ? <div className="chips">{  cell.text.map((e, i)=> <span key={e}  className={`chip chip--${cell.matches[i]}`}>{e}</span>)}</div>
                    : cell.text}

                  
                  {cell.direction === 'higher' && ' ▲'}
                  {cell.direction === 'lower' && ' ▼'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default GamePage