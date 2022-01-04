require('dotenv').config()
var cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const Song = require('./models/Song')

const PORT = process.env.PORT || 3001

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => res.send("Server online"))

app.get('/songs', async (req, res) => {
  try {
    const { c, s } = req.query
    const conditions = {}

    if (c && c == 'true')
      conditions.owned = true

    if (s) {
      conditions.$or = [
        { name: { $regex: s, $options: 'i' } },
        { category: { $regex: s, $options: 'i' } }
      ]
    }

    const data = await Song.find(conditions)
    return res.status(200).json({
      success: true,
      data
    })
  } catch (e) {
    res.status(500).send({
      success: false,
      err: 'Server Error',
      info: e
    })
  }
})

app.get('/songs/:id', async (req, res) => {
  try {
    const data = await Song.findOne({ _id: req.params.id })
    return data
      ? res.status(200).json({
        success: true,
        data
      })
      : res.status(404).json({
        success: false,
        err: 'Song Not Found'
      })
  } catch (e) {
    res.status(500).send({
      success: false,
      err: 'Server Error',
      info: e
    })
  }
})

app.post('/songs', async (req, res) => {
  try {
    const { name, price, category, owned } = req.body

    // validate
    if (!name.trim() || !category.trim())
      return res.status(401).json({
        success: false,
        err: 'Inputs Cannot Be Empty'
      })

    if (!parseFloat(price))
      return res.status(401).json({
        success: false,
        err: 'Price Must Be Number'
      })

    //  create item
    const data = await Song.create({ name, price, category, owned })
    return res.status(200).json({
      success: true,
      data
    })
  } catch (e) {
    res.status(500).send({
      success: false,
      err: 'Server Error',
      info: e
    })
  }
})

app.put('/songs/:id', async (req, res) => {
  try {
    const { name, price, category, owned } = req.body
    const id = req.params.id

    //  find by id
    let song = await Song.findOne({ _id: id })
    if (!song)
      return res.status(404).json({
        success: false,
        err: 'Song Not Found'
      })

    // validate
    if (!name.trim() || !category.trim())
      return res.status(401).json({
        success: false,
        err: 'Inputs Cannot Be Empty'
      })

    if (!parseFloat(price))
      return res.status(401).json({
        success: false,
        err: 'Price Must Be Number'
      })

    //  update item
    const data = await Song.findOneAndUpdate(
      { _id: song._id },
      {
        name,
        price,
        category,
        owned
      })
    return res.status(200).json({
      success: true,
      data
    })
  } catch (e) {
    res.status(500).send({
      success: false,
      err: 'Server Error',
      info: e
    })
  }
})

app.delete('/songs/:id', async (req, res) => {
  try {
    //  find by id
    const song = await Song.findOne({ _id: req.params.id })
    if (!song)
      return res.status(404).json({
        success: false,
        err: 'Song Not Found'
      })

    //  delete
    await Song.deleteOne({ _id: song._id })
    return res.status(200).json({
      success: true,
    })
  } catch (e) {
    res.status(500).send({
      success: false,
      err: 'Server Error',
      info: e
    })
  }
})


app.listen(PORT, () => {
  console.log(`> Server online on ${PORT}`)

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
    .then(() => console.log("> DB connected"))
    .catch(err => {
      console.log('DB connection failed. Exiting now...\n', err)
      process.exit()
    })
})