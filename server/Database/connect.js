const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const Connect = async() => {
    const CONNECTION_STRING = process.env.CONNECTION_STRING
    await mongoose.connect(CONNECTION_STRING)
}

module.exports = {Connect}