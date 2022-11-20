const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class Form extends Model {
    static associate(models) {
        // this.hasMany(models.Student, { foreignKey: 'student_id', as: 'student' })
    }

    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

Form.init(
    {
        form_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "รหัสฟอร์มสหกิจ",
        },
        supervision_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "รหัสอาจารย์นิเทศ",
        },
        semester_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "รหัสภาคการศึกษา",
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "รหัสอ้างอิงนักศึกษา",
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "รหัสสถานประกอบการ",
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "รหัสสถานะฟอร์ม",
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: "วันที่เริ่มปฏิบัติสหกิจ",
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: "วันสิ้นสุดปฏิบัติสหกิจ",
        },
        co_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "ชื่อ-สกุล ผู้ประสานงาน",
        },
        co_position: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "ตำแหน่ง ผู้ประสานงาน",
        },
        co_tel: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: "เบอร์โทรศัพท์ ผู้ประสานงาน",
        },
        co_email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "อีเมล ผู้ประสานงาน",
        },
        request_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "ชื่อ-สกุล ส่งหนังสือขอความอนุเคราะห์",
        },
        request_position: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "ตำแหน่ง ส่งหนังสือขอความอนุเคราะห์",
        },
        request_document_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "วันที่หนังสือขอความอนุเคราะห์",
        },
        request_document_number: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "เลขที่หนังสือขอความอนุเคราะห์",
        },
        max_response_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "ต้องตอบรับภายในวันที่",
        },
        send_document_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "วันที่หนังสือส่งตัว",
        },
        send_document_number: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "เลขที่หนังสือส่งตัว",
        },
        response_document_file: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "ไฟล์หนังสือตอบกลับ",
        },
        response_send_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "วันที่นักศึกษาส่งหนังสือตอบกลับ",
        },
        response_province_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "จังหวัดที่ตอบรับสหกิจ",
        },
        confirm_response_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "วันที่ตรวจสอบหนังสือตอบรับ",
        },
        workplace_address: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "ที่อยู่ที่ปฏิบัติงาน",
        },
        workplace_province_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "รหัสจังหวัดที่ปฏิบัติงาน",
        },
        workplace_amphur_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "รหัสอำเภอที่ปฏิบัติงาน",
        },
        workplace_tumbol_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "รหัสตำบลที่ปฏิบัติงาน",
        },
        workplace_googlemap_url: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "ลิงค์แผนที่สถานที่ปฏิบัติงาน",
        },
        workplace_googlemap_file: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "ไฟล์แผนที่สถานที่ปฏิบัติงาน",
        },
        plan_document_file: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "ไฟล์แผนการปฏิบัติงาน",
        },
        plan_send_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "วันที่ส่งแผนการปฏิบัติงาน",
        },
        plan_accept_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "วันที่อนุมัติแผนการปฏิบัติงาน",
        },
        reject_status_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "ขั้นตอนการปฏิเสธ (1=ที่ปรึกษา, ประธานอาจารย์นิเทศ,3=เจ้าหน้าที่คณะ, 4=เอกสารตอบรับ, 5=แผนการปฏิบัติงาน)",
        },
        advisor_verified_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "วันที่อาจารย์ที่ปรึกษาอนุมัติ",
        },
        chairman_approved_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "วันที่ประธานอาจารย์นิเทศอนุมัติ",
        },
        faculty_confirmed_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "วันที่เจ้าหน้าที่คณะอนุมัติ",
        },
        company_rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "คะแนนสถานประกอบการ (1-5)",
        },
        rating_comment: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "ความคิดเห็นเกี่ยวกับสถานประกอบการ",
        },
        next_coop: {
            type: DataTypes.TINYINT(1),
            allowNull: true,
            comment: "ต้องการรับนักศึกษาในรอบหน้า (1=รับ, 0=ไม่รับ)",
        },
        namecard_file: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "ไฟล์นามบัตร",
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
        modelName: "form", /* ชื่อตาราง */
    }
);

const Teacher = require("./Teacher");
const Semester = require("./Semester");
// const Student = require("./Student");
const Company = require("./Company");
const FormStaus = require("./FormStatus");
const Province = require("./Province");
const Amphur = require("./Amphur");
const Tumbol = require("./Tumbol");

Form.belongsTo(Teacher, { foreignKey: "supervision_id" });
Form.belongsTo(Semester, { foreignKey: "semester_id" });
// Form.belongsTo(Student, { foreignKey: "student_id", as: 'student' });
Form.belongsTo(Company, { foreignKey: "company_id" });
Form.belongsTo(FormStaus, { foreignKey: "status_id" });
Form.belongsTo(Province, { foreignKey: "response_province_id" });
Form.belongsTo(Province, { foreignKey: "province_id" });
Form.belongsTo(Amphur, { foreignKey: "amphur_id" });
Form.belongsTo(Tumbol, { foreignKey: "tumbol_id" });

module.exports = Form;