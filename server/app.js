const express = require('express')
const app = express()
const {Connect} = require('./Database/connect')
const registerUser = require('./Routes/registerRoutes')
const loginUser = require('./Routes/loginRoutes')
const wishlist = require('./Routes/wishlist')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.get('/', (req,res)=> {
    res.send("homepage")
})
app.use('/api/register', registerUser)

app.use('/api/login', loginUser)
app.use('/api/wishlist', wishlist)

const start = () => {
    if(Connect()){
        console.log("Connected to Database sucessfully");
        app.listen(5000, () => {console.log('app is listening to port 5000')})
    }
}

start()