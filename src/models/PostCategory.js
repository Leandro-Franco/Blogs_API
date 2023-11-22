const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',{
    postId:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      references: {
        model:'BlogPost',
        key: 'id',
      }
    },
    categoryId:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      references: {
        model:'Category',
        key: 'id',
      }
    }
  },
  {
    underscored:true,
    tableName: 'posts_categories',
    timestamps: false
  });
  PostCategory.associate=({Category, BlogPost}) => {
    BlogPost.belongsToMany(Category, {
      foreignKey:'postId',
      otherKey:'categoryId',
      through:PostCategory,
      as:'categories'
    })
    Category.belongsToMany(BlogPost, {
      foreignKey:'categoryId',
      otherKey:'postId',
      through:PostCategory,
      as:'blog_post'
    })
  }
  return PostCategory;
}
module.exports=PostCategory;