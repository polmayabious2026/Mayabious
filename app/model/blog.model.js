const sequelize = require("../config/db")
const{DataTypes}= require("sequelize")

const blogModel = sequelize.define("blog",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    date:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    heading:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    content:{
        type:DataTypes.TEXT('medium')
        
    },
    description:{
        type:DataTypes.TEXT('long'),
        allowNull:false,
    },
    small_image:{
        type:DataTypes.BLOB('medium'),
        allowNull:false,
    },
    big_image:{
        type:DataTypes.BLOB('long'),
        allowNull:false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
},{
    tableName:"blog",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
})

module.exports = blogModel