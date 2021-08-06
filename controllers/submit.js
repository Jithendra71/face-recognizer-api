const clarifai = require('clarifai')
const { response } = require('express')

const app = new Clarifai.App({
    apiKey:'0b4f8e0c5c094ba088b2ac6de40b8cc9'
  })

const apiCall = (req,res) =>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(response=>res.json(response))
    .catch(err=>res.status(400).json(`Error occurred while fetching image details`))
}

const submittting = (req,res,db)=>{
    const {id} = req.body;
    db('users').where({id})
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => { res.status(400).json('User not found')})
}

module.exports = {
    submittting,
    apiCall
}