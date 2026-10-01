const {Sequelize}= require("sequelize")
require("dotenv").config();
const sequelize = new Sequelize(process.env.DB_NAME, 'root', '', {
  host: 'localhost',
  dialect: "mysql",
  logging: false
});

sequelize.authenticate()
.then(()=>console.log("Database Connected Successfully"))
.catch((err)=>console.log("Database Connection Failed",err))

module.exports = sequelize; 