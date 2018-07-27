const express = require('express');
const cors = require('cors');
const api = require('./Routers/apiRouter');

const server = express();

server.use(express.json())
server.use(cors())

server.get('/', (req,res) => {
  res.send('Welcome to Node Express!')
})

server.use('/api', api)

server.listen(9000, () => {
  console.log('\n====== API Running on 9000! ======\n')
})