// src/middlewares/error.middleware.js

// 404 에러 처리 (존재하지 않는 경로)
const notFound = (req, res, next) => {
  const error = new Error(`경로를 찾을 수 없습니다 - ${req.originalUrl}`); //경로 없는곳 가면 404
  res.status(404);
  next(error);
};

// 전역 에러 핸들러
const errorHandler = (err, req, res, next) => { //에러 핸들러는 에러가 발생했을때 어떤 일을 해야할지 알려줌.
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = {
  notFound,
  errorHandler
};