const express = require("express")
const dotenv = require("dotenv")
dotenv.config();

const port = process.env.port;
const app = express();

app.use(express.json());

const prodRoute = require('./routes/productRoute')
 
app.use('/api/Product/', prodRoute);

app.listen(port, () => console.log(`server running on port ${port}`));