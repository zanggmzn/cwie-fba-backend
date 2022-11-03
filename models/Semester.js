const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class Semester extends Model {
    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

Semester.init(
    {
        semester_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "รหัสภาคการศึกษา",
        },
        semester_year: {
            type: DataTypes.STRING(4),
            allowNull: false,
            comment: "ปีการศึกษา",
        },
        term: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            comment: "ภาคการศึกษา",
        },
        round_no: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            comment: "รอบสหกิจ",
        },
        chairman_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "ประธานอาจารย์นิเทศ",
        },
        default_request_doc_no: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: "เลขที่หนังสือขอความอนุเคราะห์",
        },
        default_request_doc_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "วันที่หนังสือขอความอนุเคราะห์",
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "วันเปิดเทอม",
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "วันปิดเทอม",
        },
        regis_start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: "วันเปิดลงทะเบียนสหกิจ",
        },
        regis_end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: "วันปิดลงทะเบียนสหกิจ",
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
        modelName: "semester" /* ชื่อตาราง */,
    }
);

const Teacher = require("./Teacher");
Semester.belongsTo(Teacher, { foreignKey: "chairman_id" });

module.exports = Semester;