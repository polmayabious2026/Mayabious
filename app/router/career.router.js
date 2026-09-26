const express = require("express");
const router = express.Router();

const {
  addCareer,
  getAllCareer,
  getSingleCareer,
  updateCareer,
  deleteCareer,

  addJobVacancy,
  getAllJobVacancy,
  getSingleJobVacancy,
  updateJobVacancy,
  deleteJobVacancy,

  addValue,
  getAllValue,
  getSingleValue,
  updateValue,
  deleteValue,

  addPerksBenefit,
  getAllPerksBenefit,
  getSinglePerksBenefit,
  updatePerksBenefit,
  deletePerksBenefit,
} = require("../controller/career.con");

const upload = require("../middleware/fileupload_image");

// Career
router.post("/career", upload.single("bannerimage"), addCareer);
router.get("/career", getAllCareer);
router.get("/career/:id", getSingleCareer);
router.put("/career/:id", upload.single("bannerimage"), updateCareer);
router.delete("/career/:id", deleteCareer);

// Job Vacancy
router.post("/jobvacancy", addJobVacancy);
router.get("/jobvacancy", getAllJobVacancy);
router.get("/jobvacancy/:id", getSingleJobVacancy);
router.put("/jobvacancy/:id", updateJobVacancy);
router.delete("/jobvacancy/:id", deleteJobVacancy);

// Value
router.post("/value", addValue);
router.get("/value", getAllValue);
router.get("/value/:id", getSingleValue);
router.put("/value/:id", updateValue);
router.delete("/value/:id", deleteValue);

// Perks & Benefits
router.post("/perks-benefit", addPerksBenefit);
router.get("/perks-benefit", getAllPerksBenefit);
router.get("/perks-benefit/:id", getSinglePerksBenefit);
router.put("/perks-benefit/:id", updatePerksBenefit);
router.delete("/perks-benefit/:id", deletePerksBenefit);

module.exports = router;
