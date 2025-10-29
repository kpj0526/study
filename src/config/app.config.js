require('dotenv').config(); //모듈 가저오기

module.exports = {
  port: process.env.PORT || 3000, //포트 
  env: process.env.NODE_ENV || 'development',
  
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '5h'
  }
};