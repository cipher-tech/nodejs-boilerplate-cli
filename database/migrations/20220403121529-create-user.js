module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        name VARCHAR(60) NOT NULL,
        email VARCHAR(60) NOT NULL,
        phone_number VARCHAR(11) NOT NULL,
        age INTEGER NOT NULL DEFAULT 18,
        date_of_birth DATE null,
        created_at TIMESTAMPZ,
        updated_at TIMESTAMPZ,
    );
    `);
    },
    async down(queryInterface, Sequelize) {
        await await queryInterface.sequelize.query(`
        DROP TABLE users
      `);
    }
};
