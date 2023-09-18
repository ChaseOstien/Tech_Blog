const { Comment } = require('../models');

const commentData = [
    {
        commment: 'This post rocks!',
        user_id: 1,
        post_id: 1,
    },
    {
        comment: 'Great info!',
        user_id: 2,
        post_id: 2,
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;