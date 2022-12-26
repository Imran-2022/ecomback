const router = require('express').Router()
const { signUp, signIIn } = require('../controllers/userControllers')
const { verifyEmailRoute } = require('../controllers/verifyEmailRoute')

router.route('/sign-up')
    .post(signUp)
router.route('/sign-in')
    .post(signIIn)
router.route('/verify-email')
    .put(verifyEmailRoute)

module.exports = router;