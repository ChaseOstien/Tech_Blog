const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

// Get all users, posts and comments for homepage.
router.get('/', async (req, res) => {
    try {
        const getPosts = await Post.findAll({
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
                    },
                },
                {
                    model: User,
                    attributes: [ 'username' ],
                },
            ]
        });

    const posts = getPosts.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts, 
            logged_in: req.session.logged_in,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Redirect to homepage once logged in. 
router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

// Redirect to homepage once a user signs up


// Loads selected post and any comments associated with that post. 
router.get('/post/:id', withAuth, async (req, res) => {
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
            res.status(404).json({ message: 'No post with that id!'});
            return;
        }

        const post = getPost.get({ plain: true });
        console.log(post);
            res.render('single-post', {
                post,
                logged_in: req.session.logged_in,
            });
        }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }   
});

module.exports = router;


