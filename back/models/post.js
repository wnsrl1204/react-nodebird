module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      // MySQL에는 users 테이블 생성
      // id: {}, id가 기본적으로 들어있다. MYSQL에서 자동으로 넣어줌
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", //
      collate: "utf8mb4_general_ci", //한글 저장
    }
  );

  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // post.addUser, post.getUser , post.removeUser, post.setUser
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // post.addHashtags
    db.Post.hasMany(db.Comment); // post.addComments
    db.Post.hasMany(db.Image); // post.addImages
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); //좋아요 관계 post.addLikers, post.removeLikers
    db.Post.belongsTo(db.Post, { as: "Retweet" }); // post.addRetweet
  };
  return Post;
};
