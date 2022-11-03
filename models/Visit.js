const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class Visit extends Model {
    static associate(models) { }

    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

Visit.init(
    {
        visit_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "รหัสการออกนิเทศ",
        },
        supervision_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "รหัสอาจารย์นิเทศ",
        },
        form_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "รหัสฟอร์มออกสหกิจศึกษา",
        },
        visit_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: "วันที่ออกนิเทศ",
        },
        visit_time: {
            type: DataTypes.TIME,
            allowNull: false,
            comment: "เวลาออกนิเทศ",
        },
        co_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "ชื่อ-สกุล ผู้ประสานงาน (หนังสือขอออกนิเทศ)",
        },
        co_position: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "ตำแหน่ง ผู้ประสานงาน (หนังสือขอออกนิเทศ)",
        },
        document_number: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "เลขที่หนังสือ",
        },
        document_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            comment: "วันที่ออกหนังสือ",
        },
        visit_type: {
            type: DataTypes.ENUM("onsite", "online"),
            allowNull: false,
            comment: "ประเภทการออกนิเทศ",
        },
        googlemap_url: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "ลิ้งค์ Google Map",
        },
        googlemap_file: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "ไฟล์ Google Map (PDF)",
        },
        approve_document_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "วันที่เจ้าหน้าที่ยืนยันหนังสือขอออกนิเทศ",
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: "อีเมล",
        },
        province_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "รหัสอ้างอิงจังหวัด",
        },
        amphur_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "รหัสอ้างอิงอำเภอ",
        },
        tumbol_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "รหัสอ้างอิงตำบล",
        },
        send_report_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "วันที่อาจารย์ส่งรายงาน",
        },
        report_status_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "สถานะการส่งรายงาน (1 อาจารย์ส่งรายงาน,2 เจ้าหน้าที่ยอมรับรายงาน,3 เจ้าหน้าที่ปฏิเสธ)",
        },
        confirm_report_at: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "วันที่เจ้าหน้าที่ยอมรับหรือปฏิเสธ",
        },
        reject_report_comment: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "รายละเอียดการปฏิเสธรายงาน",
        },
        visit_detail: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "รายละเอียดการนิเทศ",
        },
        report_file: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "ไฟล์รายงานการนิเทศ",
        },
        visit_expense: {
            type: DataTypes.DOUBLE(10, 2),
            allowNull: true,
            comment: "ค่านิเทศ",
        },
        travel_expense: {
            type: DataTypes.DOUBLE(10, 2),
            allowNull: true,
            comment: "ค่าเดินทาง",
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
        modelName: "visit", /* ชื่อตาราง */
    }
);

const Teacher = require("./Teacher");
const Form = require("./Form");
const Province = require("./Province");
const Amphur = require("./Amphur");
const Tumbol = require("./Tumbol");


Visit.belongsTo(Teacher, { foreignKey: "supervision_id" });
Visit.belongsTo(Form, { foreignKey: "form_id" });
Visit.belongsTo(Province, { foreignKey: "province_id" });
Visit.belongsTo(Amphur, { foreignKey: "amphur_id" });
Visit.belongsTo(Tumbol, { foreignKey: "tumbol_id" });

module.exports = Visit;