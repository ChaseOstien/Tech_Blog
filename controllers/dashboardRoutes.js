const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

// Get all posts for dashboard view;
router.get('/', withAuth, async (req, res) => {
    try {
        const getDashboard = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: [
                'id',
                'title',
                'contents',
                'created_at',
            ],
            include: [
                {
                    model: Comment,
                    attributes: [ 'id', 'comment_text', 'user_id', 'post_id', 'created_at' ],
                        include: {
                            model: User,
                            attributes: [ 'username' ],
                        }
                },
                {
                    model: User,
                    attributes: [ 'username' ],
                },
            ]
        });

        const posts = getDashboard.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            logged_in: true,
        });
    }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
});


// Dashboard Get request for edit post view.
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const getPost = await Post.findOne({
            where: {
                id: req.params.id,
            },
            attributes: [
                'id',
                'title', 
                'contents',
                'created_at',
            ],
            include: [
                {
                model: Comment,
                attributes: [ 'id', 'comment_text', 'user_id', 'post_id', 'created_at' ],
                    include: {
                        model: User,
                        attributes: [ 'username' ],
                    }
                },
                {
                    model: User,
                    attributes: [ 'username' ],
                },
            ]
        });

        if (!getPost) {
            res.status(404).json({ message: 'No post found with that id!' });
            return;
        }

        const post = getPost.get({ plain: true });
            res.render('edit-post', {
                post,
                logged_in: true,
            });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/new', (req, res) => {
    res.render('newPost');
});

module.exports = router;