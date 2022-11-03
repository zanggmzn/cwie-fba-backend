const router = require("express").Router();
const controllers = require("../../controllers/teacher.controller");
const auth = require("../auth");
const { checkPermission } = require("../accessControl");

const {
  ErrorBadRequest,
  ErrorNotFound,
  ErrorUnauthorized,
} = require("../../configs/errorMethods");

const multer = require('multer');
const storage = multer.diskStorage({
  destination: "public/uploads/teacher/",
  filename: function (req, file, callback) {
      let filename = "teacher-" + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      filename = filename.toLowerCase();
      callback(null, filename.toLowerCase())
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          callback(null, true);
      } else {
          callback(null, false);
          return callback(ErrorBadRequest("Only .png, .jpg and .jpeg format allowed!"));
      }
  },
  limits: { fieldSize: 10 * 1024 * 1024 }, //10MB
});

router.post(
  "/hris-sync-all-teacher",
  auth.required,
  controllers.onHrisSyncAllTeacher
);

router.get(
  "/hris-find-personnel",
  auth.required,
  controllers.onHrisFindPersonnel
);

router.get(
  "/hris-personnel-info/:id",
  auth.required,
  controllers.onHrisPersonnelInfo
);

router.post(
  "/import-hris-personnel/:id",
  auth.required,
  controllers.onImportHrisPersonnel
);

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
    upload.single('signature_file_upload'),
    controllers.onInsert,
);

router.put(
    "/:id",
    auth.required,
    upload.single('signature_file_upload'),
    controllers.onUpdate
);

router.delete(
    "/:id",
    auth.required,
    controllers.onDelete
);

module.exports = router;