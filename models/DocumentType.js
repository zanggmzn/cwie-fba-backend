const { Model, DataTypes } = require("sequelize"),
  { sequelize } = require("../configs/databases");

class DocumentType extends Model {
  static associate(models) { }

  // Custom JSON Response
  //   toJSON() {
  //     return {
  //       ...this.get(),
  //     };
  //   }
}

DocumentType.init(
  {
    document_type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "รหัสประเภทเอกสาร",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      comment: "ชื่อประเภทเอกสาร",
      validate: {
        isUnique: async function (value, next) {
          let self = this;
          await DocumentType.findOne({ where: { name: value } })
          .then(function (data) {
                if (data && self.document_type_id !== data.document_type_id) {
                  throw new Error("document_type.name already exist");
                }
                return next();
          })
          .catch(function (err) {
            return next(err);
          });
        }
      }
    },
    description: {
      type: DataTypes.STRING(255),
      comment: "คำอธิบาย",
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
    modelName: "document_type",
  }
);

module.exports = DocumentType;