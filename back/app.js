const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

app.use(morgan("dev"));
app.use(
  cors({
    // origin: "*", //
    origin: "http://localhost:3060",
    credentials: true, // 쿠키 전달하려면 true로 (기본값 false)
  })
);

//localhost 3065
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json()); //json을 req.body
app.use(express.urlencoded({ extended: true })); // form submit 데이터 처리
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    // cookie: {
    //   sameSite: "lax",
    // },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);

app.listen(3065, () => {
  console.log("서버 실행중!");
});
