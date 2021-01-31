var express =  require('express')

const methods =  require('../controllers/register')

const router =  express.Router()

// router.get('/home', (req, res, next) => {
//     console.log('get / is called')
//     res.sendFile('../public/login.html', { root: '..' })
// })
router.get('/login', methods.login)

// function getRoutes() {
//     const router = express.Router()
//     router.use('/login', login)
//     return router
// }

module.exports = router