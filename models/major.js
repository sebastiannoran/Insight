"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Major extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.College);
      this.hasMany(models.Post);
      // this.belongsToMany(models.Course, {
      //   through: 'major_course'
      // });
    }
  }
  Major.init(
    {
      name: DataTypes.STRING,
      CollegeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "colleges",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Major",
      tableName: "majors",
    }
  );
  return Major;
};
