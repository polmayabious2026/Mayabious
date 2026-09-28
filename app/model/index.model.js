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
const blog = require("../model/blog.model")
// career
const {
  career,
  value,
  jobvacancy,
  perksbenifit,
  department,
  designation,
  applycandidate,
} = require("../model/career.model");



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

// department-jobvacancy
department.hasMany(jobvacancy, {
  foreignKey: "department_id",
  as:"department",
});

jobvacancy.belongsTo(department, {
  foreignKey: "department_id",
});
// designation-jobvacancy
designation.hasMany(jobvacancy, {
  foreignKey: "designation_id",
  as:"designation",
});

jobvacancy.belongsTo(designation, {
  foreignKey: "designation_id",
});

// department - designation
 department.hasMany(designation, {
  foreignKey: "department_id",
  as:"designation",
});

designation.belongsTo(department, {
  foreignKey: "department_id",
   as:"department"
});
// career-value
career.hasMany(value, {
  foreignKey: "career_id",
  onDelete: "CASCADE",
});

value.belongsTo(career, {
  foreignKey: "career_id",
});

// career-perksandbenifit
career.hasMany(perksbenifit, {
  foreignKey: "career_id",
  onDelete: "CASCADE",
});

perksbenifit.belongsTo(career, {
  foreignKey: "career_id",
});

// department-applycandidate
department.hasMany(applycandidate, {
  foreignKey: "department_id",
  as: "candidates",
});

applycandidate.belongsTo(department, {
  foreignKey: "department_id",
  as: "department",
});
// designation-applycandidate
designation.hasMany(applycandidate, {
  foreignKey: "designation_id",
  as: "candidates",
});

applycandidate.belongsTo(designation, {
  foreignKey: "designation_id",
  as: "designation",
});





sequelize.sync()
.then(()=>{console.log("Db Synced Successfully")})
.catch((error)=>{console.log("Db Not Synced ",error)})