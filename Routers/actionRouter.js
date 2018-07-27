const express = require('express');
const actionModel = require('../data/helpers/actionModel');
const projectModel = require('../data/helpers/projectModel')

const act = express.Router();

/**
 *   GET actions
 */
act.get('/', async (req,res) =>{
  try{
    const actions = await actionModel.get()
    console.log(actions)

    //If action length is > 0 send actions otherwise error
    actions.length > 0 ? res.status(200).json(actions) : 
     res.status(404).json({ message: "The actions information could not be retrieved." })
  }
  catch (err){
    res.status(500).json({error: "The actions information could not be retrieved."})
  }
  
})

/**
 *   GET actions by ID
 */
act.get('/:id', async (req,res) =>{
  
  try{
    const action = await actionModel.get(req.params.id)
  }
  catch (err){
    res.status(500).json({error: 'The action with the specified ID does not exist.'})
  }
})

/**
 *   POST actions
 */
act.post('/', async (req,res) => {
  console.log(req.body)
  try{
    
    //Check if request body has both the project_id and the description property
    if (!req.body.project_id || !req.body.description || !req.body.notes){
      res.status(400).json({errorMessage: 'An project_id and description and notes property is required in the request body.'})
    }
    
    //Check if the project_id is a number
    if (typeof(req.body.project_id) != 'number'){
      res.status(400).json({errorMessage: 'The id property must be a number'})
    }

    //Get the projects array
    const projects = await projectModel.get()
    
    //Check if the project_id is a valid project id
    if( !projects.some( project => project.id === req.body.project_id) ) {
      res.status(400).json({errorMessage: 'The project_id provided is not a valid id'})
    }
    // Good to go
    const action = await actionModel.insert(req.body);
    console.log(action)

    res.status(200).json(action);
  }
  catch (err){
    res.status(500).json({ error: err })
  }
})



/**
 *   DELETE actions by id
 */
act.delete('/:id', async (req,res) => {
  try{
    //Async call to remove the action for a certain id
    const action = await actionModel.remove(req.params.id);

    //If the action = 0, send error, otherwise respond with number of actions that were deleted.
    action == 0 ? res.status(400).json({ message: "The action with the specified ID does not exist." }) :
      res.status(200).send(`${action} record(s) were deleted`);
    }
  catch (err){
    res.status(500).json({ error: "There was an error while deleting the action to the database" })
  }
})



/**
 *   PUT actions by id
 */
act.put('/:id', async (req,res) => {
  try{
    //Check if the req body has a userId and text field
    if (!req.body.userId || !req.body.text){
      res.status(400).json({errorMessage: 'An id and text property is required in the request body.'})
    
    //Check to see that the userID is a number
    }else if (typeof(req.body.userId) != 'number'){
      res.status(400).json({errorMessage: 'The id property must be a number'})
    
    //Update the resource
    }else {
      const action = await actionModel.update(req.params.id, req.body)  
      
      //If the action is 0, then the id was wrong
      if (action == 0){
        res.status(400).json({ message: "The action with the specified ID does not exist." })
      } else {
        const updatedaction = await actionModel.get(req.params.id)
        res.status(200).json(updatedaction);
      } 
    }
  }
  
  catch (err){
    res.status(500).json({ error: "There was an error while saving the action to the database" })
  }
})

module.exports = act;