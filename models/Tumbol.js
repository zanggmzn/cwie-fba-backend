const { Model, DataTypes } = require("sequelize"),
  { sequelize } = require("../configs/databases");

class Tumbol extends Model {
  static associate(models) {}

  // Custom JSON Response
  //   toJSON() {
  //     return {
  //       ...this.get(),
  //     };
  //   }
}

Tumbol.init(
  {
    tumbol_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "รหัสอ้างอิงตำบล",
    },
    tumbol_code: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
      comment: "รหัสตำบล",
    },
    name_th: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "ชื่อตำบล (ไทย)",
    },
    name_en: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "ชื่อตำบล (อังกฤษ)",
    },
    postcode: {
      type: DataTypes.STRING(5),
      allowNull: true,
      comment: "รหัสไปรษณีย์",
    },
    amphur_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "อำเภอ",
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
      allowNull: true,
      comment: "วันที่เพิ่มข้อมูล",
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    modelName: "tumbol" /* ชื่อตาราง */,
  }
);

const Amphur = require("./Amphur");
const Province = require("./Province");

Tumbol.belongsTo(Amphur, { foreignKey: "amphur_id" });
Amphur.belongsTo(Province, { foreignKey: "province_id" ,through: 'tumbol'});

module.exports = Tumbol;
