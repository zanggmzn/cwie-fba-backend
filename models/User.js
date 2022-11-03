const { Model, DataTypes } = require("sequelize"),
  crypto = require("crypto"),
  jwt = require("jsonwebtoken"),
  config = require("../configs/app"),
  { sequelize } = require("../configs/databases");

class User extends Model {
  // Custom JSON Response
  static associate(models) {
    // this.belongsTo(models.teacher, { foreignKey: "teacherID" });
    // this.belongsToMany(models.AnimalType, {
    //   through: models.UserToAnimalType,
    //   foreignKey: "UserID",
    // });
  }

  generateJWT(obj) {
    let today = new Date(),
      exp = new Date(today);
    exp.setDate(today.getDate() + 10 || 1);

    // exp.setMinutes(today.getMinutes() + 60);

    // find group ID หริือ join
    return jwt.sign(
      {
        id: this.id,
        user_id: this.user_id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
      },
      config.secret
    );
  }

  toJSON() {
    return {
      ...this.get(),
      password: undefined,
    };
  }

  // Hash Password
  passwordHash(password) {
    return crypto.createHash("sha1").update(password).digest("hex");
  }

  // Verify Password
  validPassword(password) {
    // return this.passwordHash(password) === this.password;
    return true;
  }
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "รหัสผู้ใช้งาน",
    },

    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "ชื่อผู้ใช้งาน",
      unique: true,
      // validate: {
      //   isUnique: function (value, next) {
      //     let self = this;
      //     User.findOne({ where: { Username: value, isRemove: 0 } })
      //       .then(function (data) {
      //         console.log(self);
      //         if (data && self.UserID !== data.UserID) {
      //           throw new Error("Username already in use!");
      //         }
      //         return next();
      //       })
      //       .catch(function (err) {
      //         return next(err);
      //       });
      //   },
      // },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "รหัสผ่าน",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "ชื่อ - สกุล",
    },
    tel: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "หมายเลขโทรศัพท์",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "อีเมล",
    },
    citizen_id: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "เลขประจำตัวประชาชน",
    },
    account_type: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      comment:
        "ประเภทผู้ใช้งาน (1 = นักศึกษา, 2 = อาจารย์, 3 = เจ้าหน้าที่, 4 = admin)",
    },
    active: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
      comment: "1 = เปิดการใช้งาน / 0 = ปิดการใช้งาน",
    },
    created_user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "เลขไอดีอ้างอิง ผู้ใช้งานที่เพิ่มข้อมูล",
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
      allowNull: false,
      comment: "วัน-เวลาที่เพิ่มข้อมูล",
    },
    // updated_user_id: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: true,
    //   comment: "เลขไอดีอ้างอิง ผู้ใช้งานที่แก้ไขข้อมูลล่าสุด",
    // },
    updated_at: {
      field: "UpdatedDatetime",
      type: DataTypes.DATE,
      allowNull: true,
      comment: "วัน-เวลาที่แก้ไขข้อมูลล่าสุด",
    },
    blocked_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "วันที่ระงับการใช้งาน",
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: "user",
  }
);

module.exports = User;
