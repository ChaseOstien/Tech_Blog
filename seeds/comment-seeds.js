const { Comment } = require('../models');

const commentData = [
    {
        commment: 'This post rocks!',
        user_name: 'Chaseostien',
        post_id: 1.
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;