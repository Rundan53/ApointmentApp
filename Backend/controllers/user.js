const path = require('path');
const rootDir = require("../util/path");

const User = require('../models/user')

exports.getForm = (req, res)=> {
    res.sendFile(path.join(rootDir,'views', 'form.html'));
};

exports.postUser = (req,res)=> {
    User.create(req.body)
    .then((user)=> {
        res.json(user);
    })
    .catch((err)=> console.log(err))
    
}