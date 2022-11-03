const router = require("express").Router();
const auth = require("../auth");
// console.log("SK");

router.use("/amphur", require("./amphur"));
router.use("/company", require("./company"));
router.use("/config", require("./config"));
router.use("/department", require("./department"));
router.use("/document-type", require("./documentType"));
router.use("/faculty", require("./faculty"));
router.use("/form", require("./form"));
router.use("/form-status", require("./formStatus"));
router.use("/major", require("./major"));
router.use("/province", require("./province"));
router.use("/reject-log", require("./rejectLog"));
router.use("/semester", require("./semester"));
router.use("/student", require("./student"));
router.use("/student-document", require("./studentDocument"));
router.use("/teacher", require("./teacher"));
router.use("/tumbol", require("./tumbol"));
router.use("/user", require("./user"));
router.use("/visit", require("./visit"));
router.use("/visit-image", require("./visitImage"));
router.use("/news-category", require("./newsCategory"));
router.use("/news", require("./news"));
router.use("/prefix-name", require("./prefixName"));
router.use("/major-head", require("./majorHead"));

module.exports = router;

