const express = require('express')
const router = express.Router()
const GoogleController = require('../controllers/google')
const articleRoutes = require('./article')
const userRoutes = require('./user')

router.use('/api/articles', articleRoutes)
router.use('/api/users', userRoutes)
router.get('/api/googleloginverify', GoogleController.loginVerify)

router.get('/*', (req, res) => {
    res.status(404).json({ msg: 'page not found' })
})

module.exports = router
