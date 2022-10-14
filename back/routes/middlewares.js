exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // 사용방법 2개, next에 error를 넣으면 에러처리, error없으면 다음 미들웨어로 감
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(); // 사용방법 2개, next에 error를 넣으면 에러처리, error없으면 다음 미들웨어로 감
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};
