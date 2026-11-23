import { Routes, Route } from 'react-router'
import Home from './pages/Home.jsx'
import ModeSelect from './pages/ModeSelect.jsx'
import GamePage from './pages/GamePage.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/modes" element={<ModeSelect />} />
      <Route path="/mode/:modeId" element={<GamePage />} />
    </Routes>
  )
}

export default App