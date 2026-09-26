const sequelize = require("../config/db")

// homevideo
const homeVideo = require("../model/homevideo.model")
// service_category
const servicecategory = require("../model/service.categoty.model")
// service_subcategory
const serviceSubCategory = require("../model/service.subcategory.model")
// home_iamge_gallery
const homeImageGallery = require("../model/home.image.galary.model")
// services
const services = require("../model/services.model")
// awards
const awards = require("../model/awards.model")
// clients
const clients = require("../model/clients.model")
// team
const team = require("../model/team.model")
// news
const news = require("../model/news.model")
// blog
const news = require("../model/blog.model")



// category-subcategory
servicecategory.hasMany(serviceSubCategory,{
    foreignKey:"service_category_id",
    as:"subcategory"
})
 serviceSubCategory.belongsTo(servicecategory,{
    foreignKey:"service_category_id",
    as:"category"
 })
// category-homegallery
servicecategory.hasMany(homeImageGallery,{
    foreignKey:"service_category_id",
    as:"iamge"
})
 homeImageGallery.belongsTo(servicecategory,{
    foreignKey:"service_category_id",
    as:"category"
 })
// sub-category-homegallery
serviceSubCategory.hasMany(homeImageGallery,{
    foreignKey:"service_sub_category_id",
    as:"homegalley_image"
})
 homeImageGallery.belongsTo(serviceSubCategory,{
    foreignKey:"service_sub_category_id",
    as:"subcategory"
 })
 // category-services
servicecategory.hasMany(services,{
    foreignKey:"service_category_id",
    as:"service-image"
})
services.belongsTo(servicecategory,{
    foreignKey:"service_category_id",
    as:"category"
 })
 // sub-category-services
serviceSubCategory.hasMany(services,{
    foreignKey:"service_sub_category_id",
    as:"service-image"
})
 services.belongsTo(serviceSubCategory,{
    foreignKey:"service_sub_category_id",
    as:"subcategory"
 })





sequelize.sync()
.then(()=>{console.log("Db Synced Successfully")})
.catch((error)=>{console.log("Db Not Synced ",error)})