import React, { useState } from 'react'
import { addSong } from '../utils/songs.api'
import { useNavigate } from 'react-router-dom'
import { validateField } from '../utils/validate'
import ValidationErrorMsg from '../components/ValidateErrorMsg'

const NewSong = () => {
  const navigate = useNavigate()
  const [song, setSong] = useState({
    name: '',
    price: '',
    category: '',
  })
  const [errorMsgs, setErrorMsg] = useState({
    nameMsg: null,
    priceMsg: null,
    categoryMsg: null
  })

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
      // add song API
      addSong(name, price, category, false)
      .then(res => navigate('/songs'))
      .catch(err => {
        setSong({
          name: '',
          price: '',
          category: '',
        })
      })

    }
  }

  return (
    <div className='newsong'>
      <form onSubmit={(e) => handleSubmit(e)} className='newsong_form'>
        <div className='newsong_form_nameInput'>
          <label>Name</label>
          <input type="text" name='name' value={song.name} onChange={(e) => handleNameChange(e)} onFocus={(e) => handleNameFocus(e)} />
          <ValidationErrorMsg msg={errorMsgs.nameMsg} />
        </div>
        <div className='newsong_form_priceInput'>
          <label>Price</label>
          <input name='price' value={song.price} onChange={(e) => handlePriceChange(e)} onFocus={(e) => handlePriceFocus(e)} />
          <ValidationErrorMsg msg={errorMsgs.priceMsg} />
        </div>
        <div className='newsong_form_categoryInput'>
          <label>Category</label>
          <input name='category' value={song.category} onChange={(e) => handleCategoryChange(e)} onFocus={(e) => handleCategoryFocus(e)} />
          <ValidationErrorMsg msg={errorMsgs.categoryMsg} />
        </div>
        <button type="submit">Create</button>
        <button onClick={(e) => handleCancelButton(e)}>Cancel</button>
      </form>
      <br />
    </div>
  )
}

export default NewSong
