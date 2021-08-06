
const signingIn = (req,res,db,bcrypt)=>{
    const {email,password} = req.body
    if(!email || !password ){
        return res.status(400).json("Input fields can't be empty")
    }
    db.select('email','hash').from('login')
        .where({email})
            .then(data => {
                const isValid = bcrypt.compareSync(password, data[0].hash);
                if(isValid){
                    db.select('*').from('users').where({email})
                    .then(user => {res.json(user[0])})
                    .catch(err => res.status(400).json('Error while signing in!!'))
                }
                else{res.json('Wrong credentials')}
            })
            .catch(err => res.status(400).json('Error while signing in!!'))
}

module.exports={
    signingIn: signingIn
}