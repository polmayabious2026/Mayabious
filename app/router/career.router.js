const express = require("express");
const router = express.Router();

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
router.post("/career", upload.single("bannerimage"), addCareer);
router.get("/career", getAllCareer);
router.get("/career/:id", getSingleCareer);
router.put("/career/:id", upload.single("bannerimage"), updateCareer);
router.delete("/career/:id", deleteCareer);

// Job Vacancy
router.post(
  "/departments/:department_id/designations/:designation_id/job-vacancies",
  addJobVacancy
);
router.get("/jobvacancy", getAllJobVacancy);
router.get("/jobvacancy/:id", getSingleJobVacancy);
router.put(
  "/departments/:department_id/designations/:designation_id/job-vacancies/:id",
  updateJobVacancy
);
router.delete(
  "/departments/:department_id/designations/:designation_id/job-vacancies/:id",
  deleteJobVacancy
);

// Value
router.post("/value", addValue);
router.get("/value", getAllValue);
router.get("/value/:id", getSingleValue);
router.put("/value/:id", updateValue);
router.delete("/value/:id", deleteValue);

// Perks & Benefits
router.post("/perks-benefit",upload.array("image"), addPerksBenefit);
router.get("/perks-benefit", getAllPerksBenefit);
router.get("/perks-benefit/:id", getSinglePerksBenefit);
router.put("/perks-benefit/:id",upload.array("image"), updatePerksBenefit);
router.delete("/perks-benefit/:id", deletePerksBenefit);


 // DEPARTMENT
router.post("/create_department",addDepartment)
router.get("/getall_department",getDepartment)
router.get("/getsingle_department/:id",getSingleDepartment)
router.put("/department/:id",updateDepartment)
router.delete("/department/:id", deleteDepartment);

 // Designation
router.post("/designation/:department_id",addDesignation)
router.get("/designation",getDesignation)
router.get("/designation/:id",getSingleDesignation)
router.put("/departments/:department_id/designations/:id",updateDesignation)
router.delete("/designation/:id",deleteDesignation)

// Jobtype
router.post("/job-type", addJobType);
router.get("/job-type", getAllJobType);
router.get("/job-type/:id", getSingleJobType);
router.put("/job-type/:id", updateJobType);
router.delete("/job-type/:id", deleteJobType);

// applycandidate
router.post("/apply-candidate", uploadResume.single("resume"), addApplyCandidate);
router.get("/apply-candidate", getAllApplyCandidate);
router.get("/apply-candidate/:id", getSingleApplyCandidate);
router.put("/apply-candidate/:id",uploadResume.single("resume"),updateApplyCandidate,);
router.delete("/apply-candidate/:id", deleteApplyCandidate);



module.exports = router;
