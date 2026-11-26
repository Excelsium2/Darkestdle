import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { MODES } from '../modes.js'
import { compareRow } from '../utils/compareAttributes.js'

const GamePage = () => {
  


  const { modeId } = useParams()
  const navigate = useNavigate()
  const mode = MODES[modeId]


  const [guesses, setGuesses] = useState([])
  const [rules, openRules] = useState(false)


  if (!mode) return <p>Unknown trial.</p>
  const dateKey = new Date().toISOString().slice(0, 10)

  const hashString = (str) => {
    let hash = 5381
    for (const char of str) {
      hash = (hash * 33) ^ char.charCodeAt(0)
    }
    return hash >>> 0
  }
  const dailyAnswer = hashString(`${modeId}-${dateKey}`) % mode.candidates.length
  const answer = mode.candidates[dailyAnswer]   // fixed for now; daily pick comes later



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
      <button onClick={() => openRules(true)}>Rules</button>
      <h1>{mode.title}</h1>
      <p>{mode.subtitle}</p>

      {rules &&
        <div className="overlay">
          <div className="modal">
            <h2>How to play</h2>
            <ul>
              <li>Green: exact match. Amber: shares at least one value. Red: no match.</li>
              <li>▲ ▼ : the answer's number is higher or lower. Damage compares maximum damage.</li>
              <li>Ranks: the rank(s) from which most of the hero's skills can be used.</li>
              <li>Team effects land on the hero's own side (including themselves); enemy effects land on foes. Based on all of the hero's skills.</li>
              <li>The Arbalest and Musketeer are identical, so either name counts.</li>
            </ul>

            <button onClick={() => openRules(false)}>Close</button>
          </div>
        </div>
      }

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
                    ? <div className="chips">{  
                      cell.text.map((e, i)=> <span key={e}  className={`chip chip--${cell.matches[i]}`}>{e}</span>)
                      }</div>
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