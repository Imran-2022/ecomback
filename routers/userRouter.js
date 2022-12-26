const router = require('express').Router()
const { signUp, signIIn } = require('../controllers/userControllers')
const { verifyEmailRoute } = require('../controllers/verifyEmailRoute')
const { ForgotPasswordRoute } = require('./forgotPasswordRoute')
const { resetPasswordRoute } = require('./resetPasswordRoute')

router.route('/sign-up')
    .post(signUp)
router.route('/sign-in')
    .post(signIIn)
router.route('/verify-email')
    .put(verifyEmailRoute)
router.route('/forgot-password/:email')
    .put(ForgotPasswordRoute)
router.route('/:passwordResetCode/reset-password')
    .put(resetPasswordRoute)

module.exports = router;