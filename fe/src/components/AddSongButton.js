import { Link } from 'react-router-dom'

const AddSongButton = () => {
  return (
    <button>
      <Link to="/songs/add">
        New Song
      </Link>
    </button>
  )
}

export default AddSongButton