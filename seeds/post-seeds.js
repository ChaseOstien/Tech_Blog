const { Post } = require('../models');

const postData = [
    {
        title: 'Test',
        contents: 'This is test post number 1!',
        user_id: 1,
    },
    {
        title: 'Test2',
        contents: 'This is test post number 2!',
        user_id: 2,
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;