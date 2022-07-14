require('dotenv').config();

const configEnv = {
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	EMAIL: process.env.EMAIL,
	PASSWORD: process.env.PASSWORD,
}
module.exports = {configEnv}