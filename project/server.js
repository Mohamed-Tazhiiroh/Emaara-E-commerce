const express = require ('express')
const app = express();
const dotenv =require("dotenv")
dotenv.config()

const port = process.env.port

app.use(express.json())

// ROUTES

const Userrouters = require('./Routes/UserRouter')
const C_route = require ('./routes/categoryRoute')
const ProductRoute = require('./routes/productsRoute')
const cartRoute = require('./routes/cartRoute')

// API'S

app.use('/api/category', C_route)
app.use('/api/products', ProductRoute)
app.use('/api/cart', cartRoute)
app.use('/api/users', Userrouters,)


app.listen(port, () => console.log(`Server is Running On ${port}`))