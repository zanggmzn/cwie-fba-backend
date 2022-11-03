const router = require("express").Router();
const controllers = require("../../controllers/visit.controller");
const auth = require("../auth");
const { checkPermission } = require("../accessControl");

const {
    ErrorBadRequest,
    ErrorNotFound,
    ErrorUnauthorized,
  } = require("../../configs/errorMethods");

const multer = require('multer');
const storage = multer.diskStorage({
destination: "public/uploads/visit/",
filename: function (req, file, callback) {
    let filename = "visit-" + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    filename = filename.toLowerCase();
    callback(null, filename.toLowerCase())
},
});

const upload = multer({
storage: storage,
fileFilter: (req, file, callback) => {
    if (file.mimetype == "application/pdf") {
        callback(null, true);
    } else {
        callback(null, false);
        return callback(ErrorBadRequest("Only .pdf format allowed!"));
    }
},
limits: { fieldSize: 10 * 1024 * 1024 }, //10MB
});

router.get(
    "/",
    auth.required,
    controllers.onGetAll
);

router.get(
    "/:id",
    auth.required,
    controllers.onGetById
);

router.post(
    "/",
    auth.required,
    upload.fields([{name: "googlemap_file_upload", maxCount: 1 }, {name: "report_file_upload", maxCount: 1 }]),
    controllers.onInsert,
);

router.put(
    "/:id",
    auth.required,
    upload.fields([{name: "googlemap_file_upload", maxCount: 1 }, {name: "report_file_upload", maxCount: 1 }]),
    controllers.onUpdate
);

router.delete(
    "/:id",
    auth.required,
    controllers.onDelete
);

module.exports = router;