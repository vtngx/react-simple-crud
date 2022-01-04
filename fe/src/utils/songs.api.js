import axios from 'axios'

const HOST = 'http://localhost:3001'

export const listSongs = async (search, checked) => {
  let url = `${HOST}/songs`

  if (checked || search) {
    url += '?'
    if (checked) url += `c=${checked}&`
    if (search) url += `s=${search}&`
  }

  const response = await fetch(url)
  const data = await response.json()
  return data.data
}

export const getSong = async (id) => {
  try {
    const res = await axios.get(`${HOST}/songs/${id}`)
    return res.data
  } catch (err) {
    return err
  }
}

export const addSong = async (name, price, category, owned) => {
  try {
    return await axios.post(`${HOST}/songs`, {
      name, price, category, owned
    })
  } catch (err) {
    return err
  }
}

export const editSong = async (id, { name, price, category, owned }) => {
  try {
    return await axios.put(`${HOST}/songs/${id}`, {
      name, price, category, owned
    })
  } catch (err) {
    return err
  }
}

export const deleteSong = async (id) =>{
  try {
    const res = await axios.delete(`${HOST}/songs/${id}`)
    return res.data
  } catch (err) {
    return err
  }
}