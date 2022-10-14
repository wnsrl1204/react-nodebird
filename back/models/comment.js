module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      // MySQL에는 users 테이블 생성
      // id: {}, id가 기본적으로 들어있다. MYSQL에서 자동으로 넣어줌
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // belongsTo가 UserId, PostId라는 컬럼을 만들어 줌
    },
    {
      charset: "utf8mb4", //
      collate: "utf8mb4_general_ci", //한글 저장
    }
  );

  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
