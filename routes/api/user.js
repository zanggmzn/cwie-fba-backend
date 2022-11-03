const router = require("express").Router();
const controllers = require("../../controllers/user.controller");
const auth = require("../auth");
const { checkPermission } = require("../accessControl");

let resource = "user";

router.get(
  "/get-icit-account/:id",
  auth.required,
  checkPermission(resource, "read"),
  controllers.onGetIcitAccount
);

router.post(
  "/import-icit-account/:id",
  auth.required,
  checkPermission(resource, "read"),
  controllers.onImportIcitAccount
);


router.get(
  "/",
  auth.required,
  // checkPermission(resource, "read"),
  controllers.onGetAll
);

router.get(
  "/authorize",
  auth.required,
  checkPermission(resource, "read"),
  controllers.onAuthorize
);

router.get(
  "/check-permission",
  auth.required,
  checkPermission(resource, "read"),
  controllers.onCheckPermission
);

router.get(
  "/:id",
  auth.required,
  checkPermission(resource, "read"),
  controllers.onGetById
);

router.post(
  "/",
  auth.required,
  checkPermission(resource, "create"),
  controllers.onInsert
);

router.put(
  "/:id",
  auth.required,
  checkPermission(resource, "update"),
  controllers.onUpdate
);

router.delete(
  "/:id",
  auth.required,
  checkPermission(resource, "delete"),
  controllers.onDelete
);

router.post(
  "/login-icit-account",
  (req, res, next) => {
    // console.log("Login-icit");
    next();
  },
  controllers.onLoginIcitAccount
);

router.post(
  "/login",
  (req, res, next) => {
    console.log("FREEDOM2");
    next();
  },
  controllers.onLogin
);

router.post("/register", controllers.onRegister);
router.post("/refresh-token", controllers.onRefreshToken);
router.post("/verify-token", controllers.onVerifyToken);

module.exports = router;
