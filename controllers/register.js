
const registeringUser = (req,res,db, bcrypt)=>{
    const { name,email,password } = req.body;
    if(!email || !password || !name){
        return res.status(400).json("Input fields can't be empty")
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(logingEmail =>{
            return trx('users')
                    .returning('*')
                    .insert({
                        email:logingEmail[0],
                        name:name,
                        joined: new Date()
                    })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    
    .then(user=>{
        res.json(user[0])
    })
    .catch(err=>res.status(400).json('Can`t register '))
}

module.exports = {
    registeringUser: registeringUser
}