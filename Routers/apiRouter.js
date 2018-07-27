const express = require('express');

const act= require('./actionRouter')
const proj = require('./projectRouter')

const api = express.Router();

api.get('/', (req,res) => {
  res.send('Welcome to the API!')
})

api.use('/act', act);
api.use('/proj', proj);

module.exports = api;