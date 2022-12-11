const express = require("express")
const dotenv = require("dotenv")
dotenv.config();

const port = process.env.port;
const app = express();

app.use(express.json());


// Routes


const prodRoute = require('./routes/productRoute')
const Category = require('./routes/categoryRoute')


// links / Api's

app.use('/api/Product/', prodRoute);
app.use('/api/Category', Category);

app.listen(port, () => console.log(`server running on port ${port}`));