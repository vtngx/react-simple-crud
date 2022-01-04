import { useState } from "react"

const SongSearchBox = props => {
  const [search, setSearch] = useState('')
  const handleSearchChange = e => setSearch(e.target.value)
  const handleCheckboxChange = () => props.onCheckboxChange()
  const handleSubmit = e => {
    e.preventDefault()
    props.onSearchChange(search.trim())
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          value={search}
          onChange={e => handleSearchChange(e)}
        />
      </form>
      <input
        type="checkbox"
        checked={props.showBoughtItems}
        onChange={() => handleCheckboxChange()}
      /> Only show my songs
    </div>
  )
}

export default SongSearchBox