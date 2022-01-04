import Home from './pages/Home'
import Songs from './pages/Songs'
import NewSong from './pages/NewSong'
import EditSong from './pages/EditSong'
import TicTacToe from './pages/TicTacToe'
import TemperatureCalculator from './pages/TemperatureCalculator'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/t-calc" element={<TemperatureCalculator />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/songs/add" element={<NewSong />} />
          <Route path="/songs/edit/:id" element={<EditSong />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App