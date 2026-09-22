const sequelize = require("../config/db")


const homeVideo = require("../model/homevideo.model")
const servicecategory = require("../model/service.categoty.model")




sequelize.sync()
.then(()=>{console.log("Db Synced Successfully")})
.catch((error)=>{console.log("Db Not Synced ",error)})