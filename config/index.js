import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    jwt: {
        secret: process.env.SECRET_KEY,
    },
    port: process.env.PORT || 8002,
    prefix: process.env.API_PREFIX || 'api',
    appVersion : 'v1',
    postgreSQLUrl: process.env.POSTGRE_URL,
}

export default config;