import { validateField } from '../utils/validate'
import React, { useState, useEffect } from 'react'
import { editSong, getSong } from '../utils/songs.api'
import { useNavigate, useParams } from 'react-router-dom'
import ValidationErrorMsg from '../components/ValidateErrorMsg'

const EditSong = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [song, setSong] = useState({
    name: '',
    price: '',
    category: '',
    owned: false
  })
  const [errorMsgs, setErrorMsg] = useState({
    nameMsg: null,
    priceMsg: null,
    categoryMsg: null
  })

  useEffect(() => {
    getSong(id).then(res => {
      if (res.success) {
        const { name, price, category, owned } = res.data
        setSong({
          ...song,
          name, price, category, owned
        })
      }
    })
  }, [id])

  //  handle inputs change
  const handleNameChange = e => {
    const name = e.target.value
    setSong({ ...song, name })
    setErrorMsg({ ...errorMsgs, nameMsg: validateField(name.trim(), 'name') })
  }
  const handlePriceChange = e => {
    const price = e.target.value.trim()
    setSong({ ...song, price })
    setErrorMsg({ ...errorMsgs, priceMsg: validateField(price, 'price') })
  }
  const handleCategoryChange = e => {
    const category = e.target.value
    setSong({ ...song, category })
    setErrorMsg({ ...errorMsgs, categoryMsg: validateField(category.trim(), 'category') })
  }
  const handleOwnedChange = () => setSong({ ...song, owned: !song.owned })

  //  handle inputs focus
  const handleNameFocus = e => setErrorMsg({
    ...errorMsgs,
    nameMsg: validateField(e.target.value, 'name')
  })
  const handlePriceFocus = e => setErrorMsg({
    ...errorMsgs,
    priceMsg: validateField(e.target.value, 'price')
  })
  const handleCategoryFocus = e => setErrorMsg({
    ...errorMsgs,
    categoryMsg: validateField(e.target.value, 'category')
  })

  //  handle cancel
  const handleCancelButton = e => {
    e.preventDefault()
    navigate('/songs')
  } 

  //  handle form submit
  const handleSubmit = e => {
    e.preventDefault()
    const { name, price, category } = song
    
    if (
      !validateField(name, 'name') &&
      !validateField(price, 'price') &&
      !validateField(category, 'category')
    ) {
      // edit song API
      editSong(id, { ...song })
        .then(res => navigate('/songs'))
    }
  }

  return (
    <div className='editsong'>
      <form onSubmit={(e) => handleSubmit(e)} className='editsong_form'>
        <div className='editsong_form_nameInput'>
          <label>Name</label>
          <input type="text" name='name' value={song.name} onChange={(e) => handleNameChange(e)} onFocus={(e) => handleNameFocus(e)} />
          <ValidationErrorMsg msg={errorMsgs.nameMsg} />
        </div>
        <div className='editsong_form_priceInput'>
          <label>Price</label>
          <input name='price' value={song.price} onChange={(e) => handlePriceChange(e)} onFocus={(e) => handlePriceFocus(e)} />
          <ValidationErrorMsg msg={errorMsgs.priceMsg} />
        </div>
        <div className='editsong_form_categoryInput'>
          <label>Category</label>
          <input name='category' value={song.category} onChange={(e) => handleCategoryChange(e)} onFocus={(e) => handleCategoryFocus(e)} />
          <ValidationErrorMsg msg={errorMsgs.categoryMsg} />
        </div>
        <div className='editsong_form_ownedInput'>
          <label>Owned</label>
          <input type="checkbox" name='owned' checked={song.owned} onChange={() => handleOwnedChange()} />
          <ValidationErrorMsg msg={errorMsgs.categoryMsg} />
        </div>
        <button type="submit">Save</button>
        <button onClick={(e) => handleCancelButton(e)}>Cancel</button>
      </form>
      <br />
    </div>
  )
}

export default EditSong
