const {Sequelize}= require("sequelize")
require("dotenv").config();

const chalk = require("chalk");


const sequelize = new Sequelize(process.env.DB_NAME, 'root', '', {
  host: 'localhost',
  dialect: "mysql",
  logging: false
});

sequelize.authenticate()
.then(()=>console.log(chalk.blue("✅ Database Connected Successfully")))
.catch((err)=>console.log(chalk.red("❌ Database Connection Failed"), err))

module.exports = sequelize; 