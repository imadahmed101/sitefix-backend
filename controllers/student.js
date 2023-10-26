const studentSchema = require('../models/student')
const verificationSchema = require('../models/verification')
const resetSchema = require('../models/reset')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { generateOTP, mailTransport, generateEmailTemplate, generateVerifiedEmailTemplate, generatePasswordChangedTemplate } = require('../utils/mail')

const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const result = await studentSchema.findOne({ username })

        if (result && (await bcrypt.compare(password, result.password))) {
            return res.json({
                _id: result.id,
                firstName: result.firstName,
                username: result.username,
                isVerified: result.isVerified,
                accountType: result.accountType,
                token: generateToken(result._id)
            })
        }

        res.status(401).json(message = "Login details incorrect")


    } catch (error) {
        res.status(401).json(message = error.message)
    }
}

const register = async (req, res) => {
    const { firstName, lastName, username, password } = req.body

    try {
        const emailCheck = await studentSchema.findOne({ username })

        if (emailCheck) {
            return res.status(401).json(message = "user account already exists")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // const newUser = new studentSchema({
        //     firstName,
        //     lastName,
        //     username,
        //     password: hashedPassword
        // })

        const newUser = await studentSchema.create({ firstName, lastName, username, password: hashedPassword })

        // const verificationToken = await bcrypt.hash(verification, salt)
        const OTP = generateOTP()
        const hashedVerification = await bcrypt.hash(OTP, salt)
        const verification = new verificationSchema({
            owner: newUser._id,
            token: hashedVerification
        })
        await verification.save()

        mailTransport().sendMail({
            from: 'emailverification@email.com',
            to: newUser.username,
            subject: 'Verify your email account',
            html: generateEmailTemplate(OTP)
        })
        // await newUser.save()
        // const result = await studentSchema.create({ firstName, lastName, username, password: hashedPassword })
        res.json(newUser)
    }
    catch (error) {
        res.status(401).json(message = error.message)
    }
}

const landing = async (req, res) => {

    const student = req.body.student
    const id = student.split('"')[3]
    const username = student.split('"')[11]
    const token = student.split('"')[15]

    try {
        const result = await studentSchema.findOne({ _id: id })
        res.json({
            _id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            username: result.username,
            token: result.token
        })

    } catch (error) {
        res.status(401).json(message = error.message)
    }

}


const editProfile = async (req, res) => {
    const { firstName, lastName, student } = req.body
    const id = student.split('"')[3]

    try {
        const result = await studentSchema.findByIdAndUpdate({ _id: id }, { firstName, lastName })
        res.json(result)
    }
    catch (error) {
        res.status(401).json(message = error.message)
    }
}

const education = async (req, res) => {

    const student = req.body.student
    const id = student.split('"')[3]
    const username = student.split('"')[11]
    const token = student.split('"')[15]

    try {
        const result = await studentSchema.findOne({ _id: id })
        res.json({
            _id: result.id,
            highestDegree: result.highestDegree,
            schoolName: result.schoolName,
            schoolAddress: result.schoolAddress,
            token: result.token
        })

    } catch (error) {
        res.status(401).json(message = error.message)
    }
}

const editEducation = async (req, res) => {
    const { highestDegree, schoolName, schoolAddress, student } = req.body
    const id = student.split('"')[3]

    try {

        const result = await studentSchema.findByIdAndUpdate({ _id: id }, { highestDegree, schoolName, schoolAddress })
        res.json(result)
    }
    catch (error) {
        res.status(401).json(message = error.message)
    }
}

const work = async (req, res) => {

    const student = req.body.student
    const id = student.split('"')[3]
    const username = student.split('"')[11]
    const token = student.split('"')[15]

    try {
        const result = await studentSchema.findOne({ _id: id })
        res.json({
            _id: result.id,
            experienceLevel: result.experienceLevel,
            jobTitle: result.jobTitle,
            companyName: result.companyName,
            jobProfile: result.jobProfile,
            skills: result.skills,
            token: result.token
        })

    } catch (error) {
        res.status(401).json(message = error.message)
    }
}

const editWork = async (req, res) => {
    const { experienceLevel, jobTitle, companyName, jobProfile, skills, student } = req.body
    const id = student.split('"')[3]

    try {
        const result = await studentSchema.findByIdAndUpdate({ _id: id }, { experienceLevel, jobTitle, companyName, jobProfile, skills })
        res.json(result)
    }
    catch (error) {
        res.status(401).json(message = error.message)
    }
}

const viewProfile = async (req, res) => {
    const profileID = req.params.id

    try {
        const result = await studentSchema.findOne({ _id: profileID })
        res.json({
            _id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            username: result.username,
            highestDegree: result.highestDegree,
            schoolName: result.schoolName,
            schoolAddress: result.schoolAddress,
            experienceLevel: result.experienceLevel,
            jobTitle: result.jobTitle,
            companyName: result.companyName,
            jobProfile: result.jobProfile,
            skills: result.skills
        })
    } catch (error) {
        res.status(401).json(message = error.message)
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const verifyEmail = async (req, res) => {
    const { userId, code } = req.body

    if (!userId || !code) {
        return res.status(401).json(message = "Invalid information please try again")
    }

    try {
        const result = await verificationSchema.findOne({ owner: userId })

        if (result && (await bcrypt.compare(code, result.token))) {
            const update = await studentSchema.findByIdAndUpdate({ _id: userId }, { isVerified: true })
            await verificationSchema.findOneAndDelete({ owner: userId })

            mailTransport().sendMail({
                from: 'emailverification@email.com',
                to: update.username,
                subject: 'Email successfully verified',
                html: generateVerifiedEmailTemplate()
            })

            return res.json({
                isVerified: true,
                message: "Verified"
            })
        }

        res.status(401).json(message = "Verification details incorrect")

    } catch (error) {
        res.status(401).json(message = error.message)
    }
}

const resetCode = async (req, res) => {
    const {username} = req.body

    try {
        const emailCheck = await studentSchema.findOne({ username })

        if (!emailCheck) {
            return res.status(401).json(message = "No account found, please try again")
        }

        const salt = await bcrypt.genSalt(10)

        const OTP = generateOTP()
        const hashedReset = await bcrypt.hash(OTP, salt)
        const reset = new resetSchema({
            owner: emailCheck._id,
            token: hashedReset
        })
        
        mailTransport().sendMail({
            from: 'security@email.com',
            to: emailCheck.username,
            subject: 'Verification code for password reset',
            html: generateEmailTemplate(OTP)
        })
        await reset.save()
        // await newUser.save()
        // const result = await studentSchema.create({ firstName, lastName, username, password: hashedPassword })
        res.json({message: "sent code successfully"})
    }
    catch (error) {
        res.status(401).json(message = error.message)
    }
}

const resetPassword = async (req, res) => {
    const { username, code, password } = req.body

    if (!code || !password || !username) {
        return res.status(401).json(message = "Invalid information please try again")
    }

    try {
        const user = await studentSchema.findOne({username: username})
        console.log(user)
        const result = await resetSchema.findOne({ owner: user._id })
        console.log(result)

        if (result && (await bcrypt.compare(code, result.token))) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const update = await studentSchema.findByIdAndUpdate({ _id: user._id }, { password: hashedPassword })
            await resetSchema.findOneAndDelete({ owner: user._id })

            mailTransport().sendMail({
                from: 'emailverification@email.com',
                to: update.username,
                subject: 'Password successfully changed',
                html: generatePasswordChangedTemplate()
            })

            return res.json({
                message: "Updated password"
            })
        }

        res.status(401).json(message = "Verification details incorrect")

    } catch (error) {
        res.status(401).json(message = error.message)
    }

}

module.exports = {
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
}