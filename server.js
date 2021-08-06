
const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const submit = require('./controllers/submit')

const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'Jithendra',
    password : 'Jith@7195',
    database : 'face-recognizer'
  }
});

const app = express();

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{res.json('Welcome')})

app.post('/signin',(req,res)=>{signin.signingIn(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.registeringUser(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.getProfile(req,res,db)})

app.put('/submitImage',(req,res) => {submit.submittting(req,res,db)})

app.post('/imageUrl',(req,res) => {submit.apiCall(req,res)})

app.listen(3000)