const router = require('express').Router()
const { signUp, signIIn } = require('../controllers/userControllers')

router.route('/sign-up')
    .post(signUp)
router.route('/sign-in')
    .post(signIIn)


module.exports = router;