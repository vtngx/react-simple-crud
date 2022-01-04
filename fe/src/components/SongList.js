const SongList = props => {
  const onClickEdit = songId => props.onClickEdit(songId)
  const onClickDelete = songId => props.onClickDelete(songId)

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Owned</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.songs.map(song => (
          <tr key={song._id}>
            <td>{song.name}</td>
            <td>{song.price}</td>
            <td>{song.category}</td>
            <td>{song.owned ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => onClickEdit(song._id)}>
                Edit
              </button>
            </td>
            <td>
              <button onClick={() => onClickDelete(song._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SongList