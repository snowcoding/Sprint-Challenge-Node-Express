const express = require('express');
const actionModel = require('../data/helpers/actionModel');

const act = express.Router();

act.get('/', (req,res) => {
  res.send('Welcome to the actions!')
})

module.exports = act;