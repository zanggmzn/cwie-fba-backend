const { Model, DataTypes } = require("sequelize"),
    { sequelize } = require("../configs/databases");

class FormStatus extends Model {
    static associate(models) { }

    // Custom JSON Response
    //   toJSON() {
    //     return {
    //       ...this.get(),
    //     };
    //   }
}

FormStatus.init(
    {
        status_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            comment: "รหัสสถานะ",
        },
        name_th: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "สถานะ (ไทย)",
        },
        name_en: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: "สถานะ (อังกฤษ)",
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        paranoid: true,
        modelName: "form_status", /* ชื่อตาราง */
    }
);

module.exports = FormStatus;
