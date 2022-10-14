module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // MySQL에는 users 테이블 생성
      // id: {}, id가 기본적으로 들어있다. MYSQL에서 자동으로 넣어줌
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        unique: true, //고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, //필수
      },
      // PostId: 1, 2, 4, ... 같은 여러개의 데이터는 들어갈 수 없다.
      // 원칙적으로 생기지 않음
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", //한글 저장
    }
  );

  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); //좋아요 관계
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};
