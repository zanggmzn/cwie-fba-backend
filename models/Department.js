const { Model, DataTypes } = require("sequelize"),
  { sequelize } = require("../configs/databases");

class Department extends Model {
  // Custom JSON Response
  //   toJSON() {
  //     return {
  //       ...this.get(),
  //     };
  //   }
}

Department.init(
  {
    department_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "รหัสภาควิชา",
    },
    department_code: {
      type: DataTypes.STRING(4),
      allowNull: false,
      unique: true,
      comment: "รหัสภาควิชา",
      validate: {
        isUnique: async function (value, next) {
          let self = this;
          await Department.findOne({ where: { department_code: value } })
          .then(function (data) {
                if (data && self.department_id !== data.department_id) {
                  throw new Error("department.department_code already exist");
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
      allowNull: false,
      unique: true,
      comment: "ชื่อภาควิชา (ไทย)",
      validate: {
        isUnique: async function (value, next) {
          let self = this;
          await Department.findOne({ where: { name_th: value } })
          .then(function (data) {
                if (data && self.department_id !== data.department_id) {
                  throw new Error("department.name_th already exist");
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
      comment: "ชื่อภาควิชา (อังกฤษ)",
      validate: {
        isUnique: async function (value, next) {
          let self = this;
          await Department.findOne({ where: { name_en: value } })
          .then(function (data) {
                if (data && self.department_id !== data.department_id) {
                  throw new Error("department.name_en already exist");
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
    faculty_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "คณะ",
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
    modelName: "department" /* ชื่อตาราง */,
  }
);

const Faculty = require("./Faculty");

Department.belongsTo(Faculty, { foreignKey: "faculty_id" });

module.exports = Department;