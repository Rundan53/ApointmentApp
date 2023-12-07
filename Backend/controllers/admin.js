const User = require('../models/user')

exports.getUsers = (req,res,next)=> {
    User.findAll()
    .then((users)=>res.json(users))
    .catch((err)=> console.log(err))
}

exports.deleteUser = (req, res,next)=> {
    console.log(req.params.id)
    User.destroy({where:{id: req.params.id}})
    .catch((err)=> console.log(err))
}