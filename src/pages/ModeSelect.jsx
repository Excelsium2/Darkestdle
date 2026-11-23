import {useNavigate} from 'react-router'

const ModeSelect = () => {
  const navigate = useNavigate()

  return (
    <main className="mode-select">
      <h1>Choose Your Trial</h1>

      <button onClick={() => navigate('/mode/hero')}>Know Yourself</button>
      <button disabled>Know Thy Enemy (coming soon)</button>
      <button disabled>Know Your Arsenal (coming soon)</button>

      <button onClick={() => navigate('/')}>Return</button>
    </main>
  )
}

export default ModeSelect