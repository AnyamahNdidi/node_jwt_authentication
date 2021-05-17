require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")

const port = 2100
const app = express()
const myRouter = require("./Router")
const myRouter1 = require("./testPost")


mongoose.connect(process.env.DATA_BASE, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

mongoose.connection.once('open', () => {
  console.log('connected to database successfully....')
}).on('error', () => {
  console.log('Database connection failed')
})



app.use(express.json())
app.use("/info", myRouter)
app.use("/info", myRouter1)


app.listen(port, () => {
  console.log(`this is port ${port}`)
})