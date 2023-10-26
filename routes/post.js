const router = require('express').Router()


const {
    getPost,
    getSinglePost,
    addPost,
    updatePost,
    approvePost,
    rejectPost,
    deletePost
} = require('../controllers/post')

router.get('/', getPost)

router.get('/:id', getSinglePost)

router.post('/', addPost)

router.post('/:id', updatePost)

router.post('/:id/approve', approvePost)

router.post('/:id/reject', rejectPost)

router.delete('/:id', deletePost)


module.exports = router