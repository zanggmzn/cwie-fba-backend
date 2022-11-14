const router = require("express").Router();
const controllers = require("../../controllers/form.controller");
const auth = require("../auth");
const { checkPermission } = require("../accessControl");

const {
    ErrorBadRequest,
    ErrorNotFound,
    ErrorUnauthorized,
} = require("../../configs/errorMethods");

/**
 * https://stackoverflow.com/questions/36096805/uploading-multiple-files-with-multer-but-from-different-fields
 */
const multer = require('multer');
const storage = multer.diskStorage({
destination: "public/uploads/form/",
filename: function (req, file, callback) {
    let filename = "form-" + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    filename = filename.toLowerCase();
    callback(null, filename.toLowerCase())
},
});

const upload = multer({
storage: storage,
fileFilter: (req, file, callback) => {
    if (file.mimetype == "application/pdf" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        callback(null, true);
    } else {
        callback(null, false);
        return callback(ErrorBadRequest("Only .pdf, .png, .jpg, .jpeg format allowed!"));
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
    upload.fields([{name: "response_document_file_upload", maxCount: 1 }, {name: "workplace_googlemap_file_upload", maxCount: 1 }, {name: "plan_document_file_upload", maxCount: 1 }]),
    controllers.onInsert
);

router.put(
    "/:id",
    auth.required,
    upload.fields([{name: "response_document_file_upload", maxCount: 1 }, {name: "workplace_googlemap_file_upload", maxCount: 1 }, {name: "plan_document_file_upload", maxCount: 1 }]),
    controllers.onUpdate
);

router.delete(
    "/:id",
    auth.required,
    controllers.onDelete
);

module.exports = router;