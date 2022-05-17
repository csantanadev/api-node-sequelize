const bcryptjs = require('bcryptjs')


module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
        {
          nome: 'John Doe 1',
          email: 'jony1@gmail.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'John Doe 2',
          email: 'jony2@gmail.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'John Doe 3',
          email: 'jony3@gmail.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
    ], 
  {});

  },

  async down(queryInterface, Sequelize) { }
};
