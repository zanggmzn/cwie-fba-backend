const { Model, DataTypes } = require("sequelize"),
  { sequelize } = require("../configs/databases");

class Student extends Model {
  static associate(models) {
    // this.hasMany(models.Form, { foreignKey: 'student_id' });
    // this.hasMany(models.Form, { foreignKey: 'student_id', as: 'form' })
  }

  // Custom JSON Response
  //   toJSON() {
  //     return {
  //       ...this.get(),
  //     };
  //   }
}

Student.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "รหัสอ้างอิงนักศึกษา",
    },
    student_code: {
      type: DataTypes.STRING(13),
      allowNull: false,
      unique: true,
      comment: "รหัสนักศึกษา",
    },
    prefix_id: {
      type: DataTypes.STRING(2),
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
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "เลขประจำตัวประชาชน",
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
    faculty_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "คณะ",
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "ภาควิชา",
    },
    major_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "สาขาวิชา",
    },
    class_year: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      comment: "ชั้นปีที่",
    },
    class_room: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "ห้อง",
    },
    advisor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "อาจารย์ที่ปรึกษา",
    },
    gpa: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: true,
      comment: "เกรดเฉลี่ย",
    },
    contact1_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "ชื่อ-สกุล ผู้ที่สามารถติดต่อได้ คนที่ 1",
    },
    contact1_relation: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "ความสัมพันธ์ คนที่ 1",
    },
    contact1_tel: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "หมายเลขโทรศัพท์ คนที่ 1",
    },
    contact2_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "ชื่อ-สกุล ผู้ที่สามารถติดต่อได้ คนที่ 2",
    },
    contact2_relation: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "ความสัมพันธ์ คนที่ 2",
    },
    contact2_tel: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "หมายเลขโทรศัพท์ คนที่ 2",
    },
    blood_group: {
      type: DataTypes.ENUM("A", "B", "AB", "O"),
      allowNull: true,
      comment: "หมู่โลหิต",
    },
    congenital_disease: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "โรคประจำตัว",
    },
    drug_allergy: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "ประวัติการแพ้ยา",
    },
    emergency_tel: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "เบอร์โทรฉุกเฉิน",
    },
    height: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: true,
      comment: "ส่วนสูง",
    },
    weight: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: true,
      comment: "น้ำหนัก",
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
    modelName: "student" /* ชื่อตาราง */,
  }
);

const Province = require("./Province");
const Amphur = require("./Amphur");
const Tumbol = require("./Tumbol");
const Faculty = require("./Faculty");
const Department = require("./Department");
const Major = require("./Major");
const Teacher = require("./Teacher");
const PrefixName = require("./PrefixName");
const Form = require("./Form");

Student.belongsTo(Province, { foreignKey: "province_id" });
Student.belongsTo(Amphur, { foreignKey: "amphur_id" });
Student.belongsTo(Tumbol, { foreignKey: "tumbol_id" });
Student.belongsTo(Faculty, { foreignKey: "faculty_id" });
Student.belongsTo(Department, { foreignKey: "department_id" });
Student.belongsTo(Major, { foreignKey: "major_id" });
Student.belongsTo(Teacher, {as: 'advisor', foreignKey: "advisor_id" });
Student.belongsTo(PrefixName, { foreignKey: "prefix_id" });
Student.hasMany(Form, {as: 'forms',  foreignKey: "student_id",targetKey: 'student_id' });

module.exports = Student;