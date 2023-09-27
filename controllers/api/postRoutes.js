const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Post route to create a post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            contents: req.body.content,
            user_id: req.session.user_id,

    });

    res.json(newPost);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Put route to update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update({
            title: req.body.title,
            contents: req.body.contents,
        }, 
        {
            where: {
                id: req.params.id
            }
        });
        
        if (!updatePost) {
            res.status(400).json({ message: 'No post found with this id!' });
            return;
        }

        res.json(updatePost);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletePost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.json(deletePost);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;