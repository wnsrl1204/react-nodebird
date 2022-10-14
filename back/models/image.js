module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      // MySQL에는 users 테이블 생성
      // id: {}, id가 기본적으로 들어있다. MYSQL에서 자동으로 넣어줌
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8", //
      collate: "utf8_general_ci", //한글 저장
    }
  );

  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
