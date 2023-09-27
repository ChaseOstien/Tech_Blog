const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/:id', withAuth, async (req, res) => {
    try {
    const comment = await Comment.findAll({
            where: { 
                id: req.params.id
            }
        });
        res.json(comment);
    } catch(err) {
        res.status(500).json(err); 
    }
});

// Create a comment
router.post('/', withAuth, async (req, res) => {
    try {
        if(req.session.logged_in) {
            const newComment = await Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            });
            res.json(newComment);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;