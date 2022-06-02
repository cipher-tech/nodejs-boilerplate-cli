const testing = {
    DATABASE_URL: process.env.DATABASE_URL,
    DOMAIN: process.env.DOMAIN,
    JWT_SECRET: process.env.JWT_SECRET,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    PAPERTRAIL_URL: process.env.PAPERTRAIL_URL,
    PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT,
    ENVIRONMENT: "testing"
};

export default testing;
