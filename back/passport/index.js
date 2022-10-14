const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // req.login 이후 실행되는 것
    // req.login.의 user가 들어감
    // session에 저장되어 있는 방식
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    // id를 통해서 db에서 가져옴
    // 아이디로 부터 사용자 정보를 복구한다.

    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); // req.user 로그인 된 다음부터
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
