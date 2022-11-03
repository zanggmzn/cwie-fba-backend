const Sequelize = require("sequelize"),
    { sequelize } = require("../configs/databases");

// // ห้าม force เป็น true เด็ดขาด ข้อมูลจะถูกรีเซต
// db.sequelize.sync({ force: false }).then(() => {
//     console.log('yes re-sync done!')
// })

const Amphur = require("./Amphur");
const Company = require("./Company");
const Config = require("./Config");
const Department = require("./Department");
const DocumentType = require("./DocumentType");
const Faculty = require("./Faculty");
const Form = require("./Form");
const FormStatus = require("./FormStatus");
const Major = require("./Major");
const Province = require("./Province");
const RejectLog = require("./RejectLog");
const Semester = require("./Semester");
const Student = require("./Student");
const StudentDocument = require("./StudentDocument");
const Teacher = require("./Teacher");
const Tumbol = require("./Tumbol");
const User = require("./User");
const Visit = require("./Visit");
const VisitImage = require("./VisitImage");
const MajorHead = require("./MajorHead");

// RejectLog.sync({ force: true });
// Form.sync({ force: true });
// Semester.sync({ force: true });
// Teacher.sync({ force: true });

// Department.sync({ force: true });
// Major.sync({ force: true });
// Student.sync({ force: true });
// Form.sync({ force: true });
// Department.associate({
//     Faculty,
// });

// Faculty.associate({
//   Department,
// });

// เคย error เรื่องของลำดับด้วย

(async () => {
    await sequelize.sync().then(() => {
        console.log('-------------------------------------');
        console.log('-----------> API Started <-----------');
        console.log('-------------------------------------');
    });
    // Code here
})();

// module.exports = db
