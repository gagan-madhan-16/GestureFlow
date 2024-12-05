const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    emailjscred : {
        PUBLIC: process.env.PUBLIC,
        SERVICE: process.env.SERVICE,
        TEMPLATE: process.env.TEMPLATE,
    }
};