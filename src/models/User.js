const User = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
    id: { 
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  },
  {
    timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
    tableName: 'users',
    underscored: true,
  });
  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      as: 'blogPosts',
      foreignKey: 'userId',
    })
  };

  return User;
};

module.exports = User;