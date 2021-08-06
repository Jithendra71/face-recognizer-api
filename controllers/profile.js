
const getProfile = (req,res,db)=>{
    const {id} = req.params;
    let found = false;
    db.select('*').from('users').where({id})
        .then(user => {
            if(!user.length){
                res.status(400).json('No such user')
            }
            res.json(user[0])
        })
        .catch(err => { res.status(400).json('Error getting user info')})
}

module.exports={
    getProfile:getProfile
}