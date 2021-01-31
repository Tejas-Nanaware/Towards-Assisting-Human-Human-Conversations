const get = (req, res, next) => {
    console.log("proffile get is called");
    res.sendFile(rootDir + '/public/profile.html');
}

module.exports = {
    get,
}