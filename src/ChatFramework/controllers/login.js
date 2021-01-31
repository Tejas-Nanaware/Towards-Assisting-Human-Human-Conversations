const path = require('path');
const config = require('../config/auth.config');
const { models } = require('../sequelize');
const { Op } = require('sequelize');

const loginLoad = (req, res, next) => {
    res.sendFile(path.join(rootDir, '/public/login.html'));
}

const login = (req, res, next) => {
    const post = req.body;
    if (!req.body ) { 
        res.sendFile(path.join(rootDir, '/public/login.html'));
    }
    const username = post.email;
    const password = post.password;
    
    doLoginValidation(username, password).then(user => {
        if(!user){
            console.log('User not found');
            res.redirect('/login');
        }
        else {
            if(password != user.password){
                console.log('Incorrect password');
                res.redirect('/login');
            }
            else {
                res.redirect('/profile');
            }
        }
    }).catch(err => {
        res.status(500).send('Error: ' + err);
    });
}

const doLoginValidation = async (username, password) => {
    const user  = await models.login.findOne({
        where: {
            username: {
                [Op.eq]: username
            },
            // password: {
            //     [Op.eq]: password
            // }
        }
    });
    return user;
}

module.exports = {
    login: login,
    load: loginLoad
}