const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class RejectLog extends Model {
    static associate(models) { }

    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

RejectLog.init(
    {
        log_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "รหัส Log",
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "รายละเอียด",
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "ผู้ใช้งาน",
        },
        form_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "ฟอร์มสหกิจ",
        },
        reject_status_id: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            comment: "ขั้นตอนการปฏิเสธ (1=ที่ปรึกษา, ประธานอาจารย์นิเทศ,3=เจ้าหน้าที่คณะ, 4=เอกสารตอบรับ, 5=แผนการปฏิบัติงาน)",
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
        modelName: "reject_log", /* ชื่อตาราง */
    }
);

const User = require("./User");
const Form = require("./Form");

RejectLog.belongsTo(User, { foreignKey: "user_id" });
RejectLog.belongsTo(Form, { foreignKey: "form_id" });

module.exports = RejectLog;