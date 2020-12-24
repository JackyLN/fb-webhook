const dotenv = require('dotenv');
dotenv.config();

const config = {
  webhook: {
    verify_token: process.env.VERIFY_TOKEN,
    port: process.env.PORT,
  },
  graph: {
    domain: "https://graph.facebook.com",
    version: "v7.0",
    token: process.env.PAGE_ACCESS_TOKEN
  },
  platform: "https://graph.facebook.com/v7.0"
}

module.exports = config;