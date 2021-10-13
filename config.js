const dotenv = require('dotenv')

dotenv.config()

module.exports= {
    PORT:process.env.PORT,
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    SECRET_KEY: process.env.SECRET_KEY
}