const express = require('express');
const projectModel = require('../data/helpers/projectModel')

const proj = express.Router();

/**
 *   GET projects
 */
proj.get('/', async (req,res) =>{
  try{
    const projects = await projectModel.get()
    console.log(projects)

    //If project length is > 0 send projects otherwise error
    projects.length > 0 ? res.status(200).json(projects) : 
     res.status(404).json({ message: "The users information could not be retrieved." })
  }
  catch (err){
    res.status(500).json({error: "The users information could not be retrieved."})
  }
  
})

/**
 *   GET projects by ID
 */
proj.get('/:id', async (req,res) =>{
  
  try{
    const project = await projectModel.get(req.params.id)
  }
  catch (err){
    res.status(500).json({error: 'The project with the specified ID does not exist.'})
  }
})

/**
 *   POST project
 */
proj.post('/', async (req,res) => {
  try{
    
    //Check if request body has both the userID and the text property
    if (!req.body.name || !req.body.description){
      res.status(400).json({errorMessage: 'An name and description property is required in the request body.'})
    }

    if (req.body.name.length > 128){
      res.status(400).json({errorMessage: 'The name property in the request body must be < 128 characters.'})
    }
    // Good to go
    else {
      const project = await projectModel.insert(req.body);
      res.status(200).json(project);
    }
  }
  catch (err){
    res.status(500).json({ error: "There was an error while saving the project to the database" })
  }
})



/**
 *   DELETE projects by id
 */
proj.delete('/:id', async (req,res) => {
  try{
    //Async call to remove the project for a certain id
    const project = await projectModel.remove(req.params.id);

    //If the project = 0, send error, otherwise respond with number of projects that were deleted.
    project == 0 ? res.status(400).json({ message: "The project with the specified ID does not exist." }) :
      res.status(200).send(`${project} record(s) were deleted`);
    }
  catch (err){
    res.status(500).json({ error: "There was an error while deleting the project to the database" })
  }
})



/**
 *   PUT projects by id
 */
proj.put('/:id', async (req,res) => {
  try{
    //Check if the req body has a userId and text field
    if (!req.body.name || !req.body.description){
      res.status(400).json({errorMessage: 'An name and description property is required in the request body.'})
    }    
    
    const project = await projectModel.update(req.params.id, req.body)
    console.log(project)  
    
    //If the project is 0, then the id was wrong
    if (project === null){
      res.status(400).json({ message: "The project with the specified ID does not exist." })
    } else {
      const updatedproject = await projectModel.get(req.params.id)
      res.status(200).json(updatedproject);
    } 
  }
  
  catch (err){
    res.status(500).json({ error: "There was an error while saving the project to the database" })
  }
})

module.exports = proj;