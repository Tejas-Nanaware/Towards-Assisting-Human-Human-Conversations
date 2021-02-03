const path = require('path');
const { models } = require('../sequelize');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const registerLoad = (req, res, next) => {
    res.sendFile(path.join(rootDir, '/public/register.html'));
}

const registerUser = (req, res, next) => {
    const post = req.body;
    if(!req.body) {
        console.log('Did not receive post register body');
        res.sendFile(path.join(rootDir, '/public/register.html'));
    }
    const plainPassword = post.password;
    const userDetails = {
        'firstName': post.firstName,
        'lastName': post.lastName,
        'email': post.email,
        'age': post.age,
        'genderSelect': post.genderSelect,
        'genderText': post.genderText,
        'selectRace': post.selectRace,
        'nativeLanguageSelect': post.nativeLanguageSelect,
        'nativeLanguageText': post.nativeLanguageText,
        'nationality': post.nationality,
        'education': post.education,
        'fieldOfEducation': post.fieldOfEducation,
        'maritalStatus': post.maritalStatus,
        'employementStatus': post.employementStatus,
        'workIndustry': post.workIndustry,
        'disabilitySelect': post.disabilitySelect,
        'disabilityText': post.disabilityText,
        'recruited': post.recruited
    }

    encryptPassword(plainPassword).then(result => {
        userDetails['password'] = result['hashedPassword'];
        userDetails['passwordSalt'] = result['salt'];
        doRegisterUser(userDetails).then(user => {
            console.log(user['dataValues']);
            console.log(userDetails['email']);
            if(user['dataValues']['Email'] === userDetails['email']){
                console.log('Registered Successfully');
                res.redirect('/login');
            }
        }).catch(err => {
            res.status(500).send('Error registering: ' + err);
        });
    }).catch(err => {
        res.status(500).send('Error encrypting password ' + err);
    });
}

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(password);
    console.log(salt);
    console.log(hashedPassword);
    return {'hashedPassword': hashedPassword, 'salt': salt};
}

const doRegisterUser = async (userDetails) => {
    const user = await models.users.create({
        FirstName: userDetails['firstName'],
        LastName: userDetails['lastName'],
        Email: userDetails['email'],
        Password: userDetails['password'],
        PasswordSalt: userDetails['passwordSalt'],
        Age: userDetails['age'],
        GenderSelect: userDetails['genderSelect'],
        GenderText: userDetails['genderText'],
        Race: userDetails['selectRace'],
        NativeLanguageSelect: userDetails['nativeLanguageSelect'],
        NativeLanguageText: userDetails['nativeLanguageText'],
        Nationality: userDetails['nationality'],
        Education: userDetails['education'],
        FieldOfEducation: userDetails['fieldOfEducation'],
        MaritalStatus: userDetails['maritalStatus'],
        EmployementStatus: userDetails['employementStatus'],
        WorkIndustry: userDetails['workIndustry'],
        DisabilitySelect: userDetails['disabilitySelect'],
        DisabilityText: userDetails['disabilityText'],
        Recruited: userDetails['recruited'],
        CreatedAt: Date.now(),
        UpdatedAt: Date.now()
    });
    return user;
}

module.exports = {
    register: registerUser,
    load: registerLoad
}