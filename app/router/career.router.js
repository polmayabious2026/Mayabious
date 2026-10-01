const express = require("express");
const router = express.Router();
const adminCheck = require("../middleware/admin_check")
const {
    // Career
  addCareer,
  getAllCareer,
  getSingleCareer,
  updateCareer,
  deleteCareer,
 // Job Vacancy
  addJobVacancy,
  getAllJobVacancy,
  getSingleJobVacancy,
  updateJobVacancy,
  deleteJobVacancy,
 // Value
  addValue,
  getAllValue,
  getSingleValue,
  updateValue,
  deleteValue,
// Perks & Benefits
  addPerksBenefit,
  getAllPerksBenefit,
  getSinglePerksBenefit,
  updatePerksBenefit,
  deletePerksBenefit,

    // DEPARTMENT
  addDepartment,
  getDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,

  // Designation
  addDesignation,
  getDesignation,
  getSingleDesignation,
  updateDesignation,
  deleteDesignation,
  // jobtype
    addJobType,
  getAllJobType,
  getSingleJobType,
  updateJobType,
  deleteJobType,

    // applynow
    addApplyCandidate,
    getAllApplyCandidate,
    getSingleApplyCandidate,
    updateApplyCandidate,
    deleteApplyCandidate
  
} = require("../controller/career.con");

const upload = require("../middleware/fileupload_image");
const uploadResume = require("../middleware/fileupload_pdf");

// Career
router.post("/career", upload.single("bannerimage"),adminCheck, addCareer);
router.get("/career", getAllCareer);
router.get("/career/:id",adminCheck, getSingleCareer);
router.put("/career/:id", upload.single("bannerimage"),adminCheck, updateCareer);
router.delete("/career/:id",adminCheck, deleteCareer);

// Job Vacancy
router.post(
  "/departments/:department_id/designations/:designation_id/job-vacancies",
  adminCheck,
  addJobVacancy
);
router.get("/jobvacancy", getAllJobVacancy);
router.get("/jobvacancy/:id",adminCheck, getSingleJobVacancy);
router.put(
  "/departments/:department_id/designations/:designation_id/job-vacancies/:id",
  adminCheck,
  updateJobVacancy
);
router.delete(
  "/departments/:department_id/designations/:designation_id/job-vacancies/:id",
  adminCheck,
  deleteJobVacancy
);

// Value
router.post("/value",adminCheck, addValue);
router.get("/value", getAllValue);
router.get("/value/:id",adminCheck, getSingleValue);
router.put("/value/:id",adminCheck, updateValue);
router.delete("/value/:id",adminCheck, deleteValue);

// Perks & Benefits
router.post("/perks-benefit",upload.array("image"),adminCheck, addPerksBenefit);
router.get("/perks-benefit", getAllPerksBenefit);
router.get("/perks-benefit/:id",adminCheck, getSinglePerksBenefit);
router.put("/perks-benefit/:id",upload.array("image"),adminCheck, updatePerksBenefit);
router.delete("/perks-benefit/:id",adminCheck, deletePerksBenefit);


 // DEPARTMENT
router.post("/create_department",adminCheck,addDepartment)
router.get("/getall_department",getDepartment)
router.get("/getsingle_department/:id",adminCheck,getSingleDepartment)
router.put("/department/:id",adminCheck,updateDepartment)
router.delete("/department/:id", adminCheck,deleteDepartment);

 // Designation
router.post("/designation/:department_id",adminCheck,addDesignation)
router.get("/designation",getDesignation)
router.get("/designation/:id",adminCheck,getSingleDesignation)
router.put("/departments/:department_id/designations/:id",adminCheck,updateDesignation)
router.delete("/designation/:id",adminCheck,deleteDesignation)

// Jobtype
router.post("/job-type",adminCheck, addJobType);
router.get("/job-type", getAllJobType);
router.get("/job-type/:id",adminCheck, getSingleJobType);
router.put("/job-type/:id",adminCheck, updateJobType);
router.delete("/job-type/:id",adminCheck, deleteJobType);

// applycandidate
router.post("/apply-candidate", uploadResume.single("resume"),adminCheck, addApplyCandidate);
router.get("/apply-candidate", getAllApplyCandidate);
router.get("/apply-candidate/:id",adminCheck, getSingleApplyCandidate);
router.put("/apply-candidate/:id",uploadResume.single("resume"),adminCheck,updateApplyCandidate,);
router.delete("/apply-candidate/:id",adminCheck, deleteApplyCandidate);



module.exports = router;
