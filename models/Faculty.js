const { Model, DataTypes } = require("sequelize"),
  { sequelize } = require("../configs/databases");

class Faculty extends Model {
  static associate(models) { }

  // Custom JSON Response
  //   toJSON() {
  //     return {
  //       ...this.get(),
  //     };
  //   }
}

Faculty.init(
  {
    faculty_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "รหัสอ้างอิงคณะ",
    },
    faculty_code: {
      type: DataTypes.STRING(2),
      allowNull: false,
      unique: true,
      comment: "รหัสคณะ",
      validate: {
        isUnique: async function (value, next) {
          let self = this;
          await Faculty.findOne({ where: { faculty_code: value } })
          .then(function (data) {
                if (data && self.faculty_id !== data.faculty_id) {
                  throw new Error("faculty.faculty_code already exist");
                }
                return next();
          })
          .catch(function (err) {
            return next(err);
          });
        }
      }
    },
    name_th: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      comment: "ชื่อคณะ (ไทย)",
      validate: {
        isUnique: async function (value, next) {
          let self = this;
          await Faculty.findOne({ where: { name_th: value } })
          .then(function (data) {
                if (data && self.faculty_id !== data.faculty_id) {
                  throw new Error("faculty.name_th already exist");
                }
                return next();
          })
          .catch(function (err) {
            return next(err);
          });
        }
      }
    },
    name_en: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      comment: "ชื่อคณะ (อังกฤษ)",
      validate: {
        isUnique: async function (value, next) {
          let self = this;
          await Faculty.findOne({ where: { name_en: value } })
          .then(function (data) {
                if (data && self.faculty_id !== data.faculty_id) {
                  throw new Error("faculty.name_en already exist");
                }
                return next();
          })
          .catch(function (err) {
            return next(err);
          });
        }
      }
    },
    tel: {
      type: DataTypes.STRING(32),
      comment: "เบอร์โทรศัพท์",
    },
    fax: {
      type: DataTypes.STRING(32),
      comment: "โทรสาร",
    },
    email: {
      type: DataTypes.STRING(100),
      comment: "อีเมล",
    },
    active: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1,
      comment: "1 = เปิดการใช้งาน / 0 = ปิดการใช้งาน",
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
      allowNull: false,
      comment: "วันที่เพิ่มข้อมูล",
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "ผู้เพิ่มข้อมูล",
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
      allowNull: true,
      comment: "วันที่แก้ไขข้อมูลล่าสุด",
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "ผู้แก้ไขข้อมูลล่าสุด",
    },
    deletedAt: {
      field: "deleted_at",
      type: DataTypes.DATE,
      allowNull: true,
      comment: "วันที่ลบข้อมูล",
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
    modelName: "faculty", /* ชื่อตาราง */
  }
);

module.exports = Faculty;