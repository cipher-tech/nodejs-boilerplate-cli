module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(60) NOT NULL,
          email VARCHAR(60) NOT NULL,
          phone_number VARCHAR(11) NOT NULL,
          password VARCHAR(100) NOT NULL,
          age INTEGER NOT NULL DEFAULT 18,
          date_of_birth DATE null,
          created_at TIMESTAMPTZ,
          updated_at TIMESTAMPTZ
      );
    `);
    },
    async down(queryInterface, Sequelize) {
        await await queryInterface.sequelize.query(`
        DROP TABLE users
      `);
    }
};
