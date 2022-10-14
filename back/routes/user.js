const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");
const db = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log(req.headers);
  try {
    console.log(req.user);
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        // attributes: ['id', 'nickname', 'email'], // 원하는 정보만
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Post, //include 했던애 그대로 가져오면 되고, as적은애는 as를 그대로
            attributes: ["id"], //숫자만 셀것이기 때문에 성능 향상을 위해 아이디만 가져온다.
          },
          {
            model: db.User,
            as: "Followings",
            attributes: ["id"], //숫자만 셀것이기 때문에 성능 향상을 위해 아이디만 가져온다.
          },
          {
            model: db.User,
            as: "Followers",
            attributes: ["id"], //숫자만 셀것이기 때문에 성능 향상을 위해 아이디만 가져온다.
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      //서버쪽 에러
      console.error(err);
      return next(err);
    }
    if (info) {
      //client에러시
      // 403금지 401허가되지 않음
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      //이것은 패스포트 로그인
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        // attributes: ['id', 'nickname', 'email'], // 원하는 정보만
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Post, //include 했던애 그대로 가져오면 되고, as적은애는 as를 그대로
          },
          {
            model: db.User,
            as: "Followings",
            attributes: ["id"], //숫자만 셀것이기 때문에 성능 향상을 위해 아이디만 가져온다.
          },
          {
            model: db.User,
            as: "Followers",
            attributes: ["id"], //숫자만 셀것이기 때문에 성능 향상을 위해 아이디만 가져온다.
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 13);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    // res.setHeader("Access-Control-Allow-Orign", "http://localhost:3060");
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); //500
  }
});

router.post("/logout", isLoggedIn, (req, res, next) => {
  // 로그인 안한 사람이 로그인 하면 어떻게 될까

  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    req.session.destroy();
    res.send("ok");
  });
});

router.patch("/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: parseInt(req.params.userId, 10) },
    });

    if (!user) {
      return res.status(403).send("없는 사람을 팔로우하려고 하시네요?");
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: parseInt(req.params.userId, 10) },
    });

    if (!user) {
      return res.status(403).send("없는 사람을 언팔로우하려고 하시네요?");
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/follower/:userId", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: parseInt(req.params.userId, 10) },
    });

    if (!user) {
      return res.status(403).send("없는 사람을 차단하려고 하시네요?");
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/followers", isLoggedIn, async (req, res, next) => {
  try {
    const followers = await req.user.getFollowers({
      limit: parseInt(req.query.limit),
    });

    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/followings", isLoggedIn, async (req, res, next) => {
  try {
    const followings = await req.user.getFollowings({
      limit: parseInt(req.query.limit),
    });
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
