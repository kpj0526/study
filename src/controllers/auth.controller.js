const authService = require('../services/auth.service');
const { success } = require('../utils/response.util');

// 회원가입
exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const result = await authService.signup(username, password);
    
    return success(res, result, '회원가입 성공', 201);
  } catch (err) {
    next(err);
  }
};

// 로그인
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const result = await authService.login(username, password);
    
    return success(res, result, '로그인 성공');
  } catch (err) {
    next(err);
  }
};

// 내 정보 조회
exports.getMe = async (req, res, next) => {
  try {
    const userId = req.user.id; // auth.middleware에서 설정한 값
    
    const user = await authService.getMe(userId);
    
    return success(res, { user }, '내 정보 조회 성공');
  } catch (err) {
    next(err);
  }
};