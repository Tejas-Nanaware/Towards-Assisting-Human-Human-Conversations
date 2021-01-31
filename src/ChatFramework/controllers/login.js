const path = require('path');
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
    const email = post.email;
    const password = post.password;
    
    doLoginValidation(email, password).then(user => {
        if(!user){
            console.log('User not found');
            res.redirect('/login');
        }
        else {
            if(password != user['dataValues']['Password']){
                console.log('Incorrect password');
                res.redirect('/login');
            }
            else {
                req.session['userID'] = user['dataValues']['ID'];
                req.session['email'] = user['dataValues']['Email'];
                res.redirect('/profile');
            }
        }
    }).catch(err => {
        res.status(500).send('Error: ' + err);
    });
}

const doLoginValidation = async (email, password) => {
    const user  = await models.users.findOne({
        where: {
            Email: {
                [Op.eq]: email
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