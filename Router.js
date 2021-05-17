const express = require("express");
const router = express.Router();
const newUser = require("./model")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()
const SECRET = process.env.SECRET_TOKEN


router.post("/registration", async (req, res) => {
  const salted = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salted)

  const data = await newUser.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  res.status(201).json(data)
})

router.post('/signin', async (req, res) => {
  const user = await newUser.findOne({
    email: req.body.email
  })
  if (!user) {
    res.status(404).send("Email does not exit")
  }
  const checkPassword = await bcrypt.compare(req.body.password, user.password)
  if (!checkPassword) {
    res.status(404).send("Password is invalid")
  }

  const checker = await jwt.sign({ _id: user._id }, SECRET)

  res.header("auth-token", checker).json({
    token: checker,
    mgs: "Welcome back"
  })

  // res.status(201).json({ mgs: "Welcome back" })
})

module.exports = router