const {Sequelize}= require("sequelize")

const sequelize = new Sequelize('mayabious', 'root', '', {
  host: 'localhost',
  dialect: "mysql"
});

sequelize.authenticate()
.then(()=>console.log("Database Connected Successfully"))
.catch((err)=>console.log("Database Connection Failed",err))

module.exports = sequelize; 