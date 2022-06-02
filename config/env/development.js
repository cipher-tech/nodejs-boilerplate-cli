const development = {
    API_VERSION: process.env.API_VERSION,
    DATABASE_URL: process.env.DATABASE_URL,
    DOMAIN: process.env.DOMAIN,
    JWT_SECRET: process.env.JWT_SECRET,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    PAPERTRAIL_URL: process.env.PAPERTRAIL_URL,
    PORT: process.env.PORT,
    PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT,
    ENVIRONMENT: "development"
};

export default development;
