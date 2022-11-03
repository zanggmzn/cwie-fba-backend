const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class VisitImage extends Model {
    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

VisitImage.init(
    {
        visit_image_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "รหัสรูปภาพการออกนิเทศ",
        },
        visit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "รหัสการออกนิเทศ",
        },
        image_file: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "รูปภาพการออกนิเทศ",
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
        modelName: "visit_image" /* ชื่อตาราง */,
    }
);

const Visit = require("./Visit");

VisitImage.belongsTo(Visit, { foreignKey: "visit_id" });

module.exports = VisitImage;
