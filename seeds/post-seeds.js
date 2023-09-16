const { Post } = require('../models');

const postData = [
    {
        title: 'Test',
        contents: 'This is test post number 1!',
        user_name: 'Chaseostien',
        user_id: 1,
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;