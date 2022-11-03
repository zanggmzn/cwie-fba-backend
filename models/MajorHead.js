const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class MajorHead extends Model {
    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

MajorHead.init(
    {
        major_head_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "รหัสข่าวประกาศ",
        },
        semester_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "รหัสภาคการศึกษา",
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "ประธานอาจารย์นิเทศประจำสาขา",
        },
        major_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "รหัสอ้างอิงสาขาวิชา",
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
        modelName: "major_head" /* ชื่อตาราง */,
    }
);

const Teacher = require("./Teacher");
const Major = require("./Major");
const Semester = require("./Semester");

MajorHead.belongsTo(Teacher, { foreignKey: "teacher_id" });
MajorHead.belongsTo(Major, { foreignKey: "major_id" });
MajorHead.belongsTo(Semester, { foreignKey: "semester_id" });

module.exports = MajorHead;