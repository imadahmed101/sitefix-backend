const router = require('express').Router()


const {
    getComment,
    getSingleComment,
    addComment,
    updateComment,
    deleteComment
} = require('../controllers/comment')

router.get('/', getComment)

router.get('/:id', getSingleComment)

router.post('/', addComment)

router.post('/:id', updateComment)

router.delete('/:id', deleteComment)


module.exports = router