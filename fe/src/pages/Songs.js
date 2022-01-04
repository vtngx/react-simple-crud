import './Songs.css'
import SongList from '../components/SongList'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import AddSongButton from '../components/AddSongButton'
import SongSearchBox from '../components/SongSearchBox'
import { listSongs, deleteSong } from '../utils/songs.api'

const Song = () => {
  const navigate = useNavigate()

  const [updateList, setUpdateList] = useState(false)
  const [songList, setSongList] = useState([])
  const [checked, setChecked] = useState(false)
  const [search, setSearch] = useState("")

  //  handle 
  useEffect(() => {
    listSongs(search, checked).then(data => {
      setSongList(data)
      setUpdateList(false)
    })
  }, [checked, search, updateList])

  //  handle inputs change
  const onSearchChange = s => setSearch(s)
  const onCheckboxChange = () => setChecked(!checked)

  //  handle edit song
  const handleEditSong = songId => {
    navigate(`/songs/edit/${songId}`)
  }

  //  handle delete song
  const handleDeleteSong = songId => {
    deleteSong(songId).then(res => {
      if (res.success)
        setUpdateList(true)
    })
  }

  return (
    <div className='songs'>
      <div className='songs_search'>
        <SongSearchBox
          search={search}
          showBoughtItems={checked}
          onSearchChange={e => onSearchChange(e)}
          onCheckboxChange={() => onCheckboxChange()}
        />
      </div>
      <div className='songs_list'>
        <SongList
          songs={songList}
          onClickEdit={e => handleEditSong(e)}
          onClickDelete={e => handleDeleteSong(e)}
        />
      </div>
      <div className='songs_addButton'>
        <AddSongButton />
      </div>
    </div>
  )
}

export default Song
