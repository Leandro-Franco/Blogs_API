const Category = (sequelize, DataTypes) => {
  const Category =
  sequelize.define('Category', {
    id:{
      primaryKey: true,
      allowNull: false,
      autoIncrement:true,
      type: DataTypes.INTEGER,
    },
    name:{
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    model:'categories',
    underscored: true,
  });
  return Category;
};

module.exports= Category;