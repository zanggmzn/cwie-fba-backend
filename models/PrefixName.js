const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class PrefixName extends Model {
    static associate(models) { }

    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

PrefixName.init(
    {
        prefix_id: {
            type: DataTypes.STRING(2),
            primaryKey: true,
            allowNull: false,
            comment: "รหัสคำนำหน้าชื่อ",
        },
        prefix_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "คำนำหน้าชื่อ",
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
            allowNull: true,
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
        modelName: "prefix_name", /* ชื่อตาราง */
    }
);

module.exports = PrefixName;