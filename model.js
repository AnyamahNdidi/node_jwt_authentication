const mongoose = require("mongoose")


const Userschema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: false
  },
})


module.exports = mongoose.model("AuthUser", Userschema)
