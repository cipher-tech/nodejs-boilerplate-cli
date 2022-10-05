const staging = {
    API_VERSION: process.env.API_VERSION,
    DATABASE_URL: process.env.DATABASE_URL,
    DOMAIN: process.env.DOMAIN,
    JWT_SECRET: process.env.JWT_SECRET,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    PAPERTRAIL_URL: process.env.PAPERTRAIL_URL,
    PORT: process.env.PORT,
    PAPERTRAIL_PORT: process.env.PAPERTRAIL_PORT,
    ENVIRONMENT: "development",
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    HOST: process.env.HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DIALECT: process.env.DIALECT,
    JWT_TIME_TO_LIVE: process.env.JWT_TIME_TO_LIVE
};

export default staging;
