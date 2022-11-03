const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class Province extends Model {
    static associate(models) { }

    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

Province.init(
    {
        province_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "รหัสอ้างอิงจังหวัด",
        },
        province_code: {
            type: DataTypes.STRING(2),
            allowNull: false,
            unique: true,
            comment: "รหัสจังหวัด",
        },
        name_th: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "ชื่อจังหวัด (ไทย)",
        },
        name_en: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "ชื่อจังหวัด (อังกฤษ)",
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
        modelName: "province", /* ชื่อตาราง */
    }
);

module.exports = Province;