const getProfile = (req, res, next) => {
    // check if session is set
    if(!req.session['userID']){
        return res.status(500).redirect('/login');
    }

    res.sendFile(rootDir + '/public/profile.html');
    console.log(req.session);
    console.log(req.session['userID']);

}

module.exports = {
    getProfile: getProfile,
}