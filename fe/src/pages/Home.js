import './Home.css'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      <Link to="/tic-tac-toe">Tic Tac Toe</Link>
      <Link to="/t-calc">Temperature Calculator</Link>
      <Link to="/songs">Songs (Simple CRUD)</Link>
    </div>
  )
}

export default Home
