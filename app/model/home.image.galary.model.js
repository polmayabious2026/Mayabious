const sequelize = require("../config/db")
const{DataTypes}= require("sequelize")

const homeImageGallery = sequelize.define("homeimagegallery",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    service_category_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    service_sub_category_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    status: {
      type: DataTypes.STRING,
      comment: "1 = active, 0 = inactive",
      defaultValue: "1",
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
},{
    tableName: "homeimagegallery",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})

module.exports = homeImageGallery