const { User } = require('../models')

const userData = [
    {
        username: 'Chaseostien',
        password: 'password12345',
    },
    {
        username: 'johndoe',
        password: 'password123456',
    }
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUsers;