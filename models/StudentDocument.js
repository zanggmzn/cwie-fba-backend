const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class StudentDocument extends Model {
    static associate(models) { }

    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

StudentDocument.init(
    {
        document_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "รหัสเอกสาร",
        },
        document_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "ชื่อเอกสาร",
        },
        document_file: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "ไฟล์เอกสาร",
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "นักศึกษา",
        },
        document_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "รหัสอ้างอิงประเภทเอกสาร",
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
        modelName: "student_document", /* ชื่อตาราง */
    }
);

const Student = require("./Student");
const DocumentType = require("./DocumentType");

StudentDocument.belongsTo(Student, { foreignKey: "student_id" });
StudentDocument.belongsTo(DocumentType, { foreignKey: "document_type_id" });

module.exports = StudentDocument;