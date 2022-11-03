const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class News extends Model {
    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

News.init(
    {
        news_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "รหัสข่าวประกาศ",
        },
        news_title: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: "หัวข้อข่าว",
        },
        news_detail: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "รายละเอียดประกาศ",
        },
        news_file: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: "ไฟล์ประกอบข่าว",
        },
        pinned: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 0,
            comment: "ปักหมุดข่าว (1 = เปิดการใช้งาน / 0 = ปิดการใช้งาน)",
        },
        news_cate_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "รหัสประเภทข่าว",
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
        modelName: "news" /* ชื่อตาราง */,
    }
);

const NewsCategory = require("./NewsCategory");
News.belongsTo(NewsCategory, { foreignKey: "news_cate_id" });

module.exports = News;