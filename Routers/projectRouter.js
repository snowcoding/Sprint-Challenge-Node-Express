const express = require('express');
const projectModel = require('../data/helpers/projectModel')

const proj = express.Router();

proj.get('/', (req,res) => {
  res.send('hello projects!')
})

module.exports = proj;