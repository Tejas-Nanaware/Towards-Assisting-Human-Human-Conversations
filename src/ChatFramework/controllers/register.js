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
    const firstName = post.firstName;
    const lastName = post.lastName;
    const email = post.email;
    const password = post.password;
    const age = post.age;
    const genderSelect = post.genderSelect;
    const genderText = post.genderText;
    const selectRace = post.selectRace;
    const nativeLanguageSelect = post.nativeLanguageSelect;
    const nativeLanguageText = post.nativeLanguageText;
    const nationality = post.nationality;
    const education = post.education;
    const fieldOfEducation = post.fieldOfEducation;
    const maritalStatus = post.maritalStatus;
    const employementStatus = post.employementStatus;
    const workIndustry = post.workIndustry;
    const disabilitySelect = post.disabilitySelect;
    const disabilityText = post.disabilityText;
    const recruited = post.recruited;
    
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    console.log(age);
    console.log(genderSelect);
    console.log(genderText);
    console.log(selectRace);
    console.log(nativeLanguageSelect);
    console.log(nativeLanguageText);
    console.log(nationality);
    console.log(education);
    console.log(fieldOfEducation);
    console.log(maritalStatus);
    console.log(employementStatus);
    console.log(workIndustry);
    console.log(disabilitySelect);
    console.log(disabilityText);
    console.log(recruited);

    encryptPassword(password).then(result => {
        doRegisterUser(firstName, lastName, email, result['hashedPassword'], result['salt']).then(user => {
            console.log(user['dataValues']);
            console.log(email);
            if(user['dataValues']['Email'] === email){
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
    return {'hashedPassword': hashedPassword, 'salt': salt};
}

const doRegisterUser = async (firstName, lastName, email, password, passwordSalt) => {
    const user = await models.users.create({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        PasswordSalt: passwordSalt,
        CreatedAt: Date.now(),
        UpdatedAt: Date.now()
    });
    return user;
}

module.exports = {
    register: registerUser,
    load: registerLoad
}