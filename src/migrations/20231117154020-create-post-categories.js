'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field:'post_id'
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field:'category_id'
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post_categories')
  }
};
