const index = (req, res, next) => {
    console.log("index is called");
    res.sendFile(rootDir + '/public/index.html');
}

module.exports = {
    index: index
}