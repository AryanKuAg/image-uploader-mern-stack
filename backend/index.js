const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router')

const port = process.env.PORT || 9000;

// middleware
app.use(express.json())
const corsOptions = {
  
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  
app.use(cors(corsOptions));

app.use(router)



app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log('The server is up and running on port:', port)
})