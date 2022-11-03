const jwt = require("jsonwebtoken");

const User = require("../models/User");
// const Menu = require("../models/Menu");

// Menu is Resource
// IsAdd IsUpdate IsDelete IsPreview is Action

const checkPermission = (resource, action) => {
  return async (req, res, next) => {
    let permission = false;

    const decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
    const user = await User.findByPk(decoded.id);

    // Resource
    // const menu = await Menu.findOne({ where: { MenuCode: resource } });

    $where = {};

    permission = true;
    if (permission === true) {
      next();
      return;
    }

    res.status(405).send({
      error: {
        status: 405,
        message: "Method Not Allowed",
      },
    });
  };
};

exports.checkPermission = checkPermission;
