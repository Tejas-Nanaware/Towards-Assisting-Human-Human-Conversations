const path = require('path');
const { models } = require('../sequelize');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

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
        if (!user) {
            console.log('User not found');
            res.redirect('/login');
        } else {
            comparePasswords(password, user['dataValues']['Password'], user['dataValues']['PasswordSalt']).then(checkPassword => {
                if (!checkPassword) {
                    console.log('Incorrect password');
                    res.redirect('/login');
                } else {
                    req.session['userID'] = user['dataValues']['ID'];
                    req.session['email'] = user['dataValues']['Email'];
                    res.redirect('/profile');
                }
            }).catch(err => {
                res.status(500).send('Error comparing passwords: ' + err);
            });
        }
    }).catch(err => {
        res.status(500).send('Error validating login: ' + err);
    });
}

const comparePasswords = async(inputPassword, dataPassword, dataSalt) => {
    const hashedPassword = await bcrypt.hash(inputPassword, dataSalt);

    // const result = await bcrypt.compare(dataPassword, hashedPassword);
    // console.log(result);
    // return result;

    if(hashedPassword === dataPassword){
        return true;
    } else {
        return false;
    }
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