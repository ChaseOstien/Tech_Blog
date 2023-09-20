const { Comment } = require('../models');

const commentData = [
    {
        commment_text: 'This post rocks!',
        user_id: 1,
        post_id: 1,
    },
    {
        comment_text: 'Great info!',
        user_id: 2,
        post_id: 2,
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;