const router = require('express').Router()

const {
    getStudent,
    login,
    register,
    landing,
    editProfile,
    education,
    editEducation,
    work,
    editWork,
    viewProfile,
    verifyEmail,
    resetCode,
    resetPassword
    } = require('../controllers/student')

const { validator, validate } = require('../middlewares/validator')

router.get('/', getStudent)

router.post('/login', login)

router.post('/register', validator, validate, register)

router.post('/landing', landing)

router.post('/editprofile', editProfile)

router.post('/education', education)

router.post('/editeducation', editEducation)

router.post('/work', work)

router.post('/editwork', editWork)

router.get('/profile/:id', viewProfile)

router.post('/verifyemail', verifyEmail)

router.post('/resetcode', resetCode)

router.post('/resetpassword', resetPassword)





module.exports = router