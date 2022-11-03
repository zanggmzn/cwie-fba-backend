const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class Major extends Model {
    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

Major.init(
    {
        major_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "รหัสอ้างอิงสาขาวิชา",
        },
        major_code: {
            type: DataTypes.STRING(6),
            allowNull: false,
            unique: true,
            comment: "รหัสสาขาวิชา",
            validate: {
                isUnique: async function (value, next) {
                  let self = this;
                  await Major.findOne({ where: { major_code: value } })
                  .then(function (data) {
                        if (data && self.major_id !== data.major_id) {
                          throw new Error("major.major_code already exist");
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
            comment: "ชื่อสาขาวิชา (ไทย)",
            validate: {
                isUnique: async function (value, next) {
                  let self = this;
                  await Major.findOne({ where: { name_th: value } })
                  .then(function (data) {
                        if (data && self.major_id !== data.major_id) {
                          throw new Error("major.name_th already exist");
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
            comment: "ชื่อสาขาวิชา (อังกฤษ)",
            validate: {
                isUnique: async function (value, next) {
                  let self = this;
                  await Major.findOne({ where: { name_en: value } })
                  .then(function (data) {
                        if (data && self.major_id !== data.major_id) {
                          throw new Error("major.name_en already exist");
                        }
                        return next();
                  })
                  .catch(function (err) {
                    return next(err);
                  });
                }
            }
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "ภาควิชา",
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
        modelName: "major" /* ชื่อตาราง */,
    }
);

const Department = require("./Department");
Major.belongsTo(Department, { foreignKey: "department_id" });

module.exports = Major;