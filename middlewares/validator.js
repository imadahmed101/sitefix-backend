const { check, validationResult } = require('express-validator')

exports.validator = [
    check('firstName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('firstName missing'),

    check('lastName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('lastName missing'),

    check('username')
    .normalizeEmail()
    .isEmail()
    .withMessage('email is invalid'),

    check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password missing')
    .isLength({ min: 5, max: 20})
    .withMessage('Password must be 5-20 characters')
]

exports.validate = (req, res, next) => {
    const error = validationResult(req).array()
    if(!error.length) return next ()

    res.status(400).json({success: false, error: error[0].msg})
}