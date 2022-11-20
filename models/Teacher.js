const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class Teacher extends Model {
    static associate(models) {
        // this.hasMany(models.Department, { foreignKey: 'faculty_id' });
    }

    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

Teacher.init(
    {
        teacher_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "รหัสอาจารย์",
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "รหัสผู้ใช้งาน",
        },
        person_key: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: "HRIS person_key",
        },
        prefix: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "คำนำหน้าชื่อ",
        },
        firstname: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "ชื่อ",
        },
        surname: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "นามสกุล",
        },
        citizen_id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: "รหัสบัตรประชาชน",
        },
        tel: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: "เบอร์โทรศัพท์",
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "อีเมล",
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "อีเมล",
        },
        province_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "จังหวัด",
        },
        amphur_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "อำเภอ",
        },
        tumbol_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "ตำบล",
        },
        signature_file: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "ไฟล์ลายเซ็น",
        },
        faculty_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "คณะ",
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "ภาควิชา",
        },
        executive_position: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "ตำแหน่งบริหาร",
        },
        hris_last_updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "เวลาอัพเดทข้อมูลของ HRIS ล่าสุด",
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
        modelName: "teacher", /* ชื่อตาราง */
    }
);

const User = require("./User");
const Province = require("./Province");
const Amphur = require("./Amphur");
const Tumbol = require("./Tumbol");
const Faculty = require("./Faculty");
const Department = require("./Department");
// const Form = require("./Form");

Teacher.belongsTo(User, { foreignKey: "user_id" });
Teacher.belongsTo(Province, { foreignKey: "province_id" });
Teacher.belongsTo(Amphur, { foreignKey: "amphur_id" });
Teacher.belongsTo(Tumbol, { foreignKey: "tumbol_id" });
Teacher.belongsTo(Faculty, { foreignKey: "faculty_id" });
Teacher.belongsTo(Department, { foreignKey: "department_id" });
// Teacher.hasMany(Form, { foreignKey: "supervision_id" , as: 'supervision'});

module.exports = Teacher;