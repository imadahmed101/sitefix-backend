const postSchema = require('../models/post')

const addPost = async (req, res) => {
    const {title, question, creator, username} = req.body

    try {
        const result = await postSchema.create({ title, question, creator, username })
        res.json(result)
    }
    catch (error) {
        res.status(401).json(message = error.message)
    }
}

const getPost = async (req, res) => {
    try {
        const result = await postSchema.find({})
        res.json(result)
    } catch (error) {
        res.status(401).json(message = error.message)
    }
}

const getSinglePost = async (req, res) => {
    const postID = req.params.id
    try {
        const result = await postSchema.findOne({_id: postID})
        res.json(result)
    } catch (error) {
        res.status(401).json(message = error.message)
    }
}

const updatePost = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const approvePost = async (req, res) => {
    const postID = req.params.id
    const {admin} = req.body

    if (admin === "user") {
        return res.status(401).json(message = "Account not authorized")
    }

    try {

        const result = await postSchema.findOneAndUpdate({_id: postID},{isApproved: true})
        res.json({
            message: "Approved post"
        })
        
    } catch (error) {
        res.status(401).json(message = error.message)        
    }
}

const rejectPost = async (req, res) => {
    const postID = req.params.id
    const {admin} = req.body

    if (admin === "user") {
        return res.status(401).json(message = "Account not authorized")
    }

    try {

        const result = await postSchema.findOneAndUpdate({_id: postID},{isApproved: false})
        res.json({
            message: "Rejected post"
        })
        
    } catch (error) {
        res.status(401).json(message = error.message)        
    }
}

const deletePost = async (req, res) => {
    const postID = req.params.id
    try {
        const result = await postSchema.findOneAndDelete({_id: postID})
        res.json(result)
        
    } catch (error) {
        res.status(401).json(message = error.message)
        
    }
}

module.exports = {
    getPost,
    getSinglePost,
    addPost,
    updatePost,
    approvePost,
    rejectPost,
    deletePost
}