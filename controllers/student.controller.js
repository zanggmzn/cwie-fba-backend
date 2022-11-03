const Service = require("../services/student.service"),
    studentService = require("../services/student.service"),
    facultyService = require("../services/faculty.service"),
    departmentService = require("../services/department.service"),
    majorService = require("../services/major.service"),
    dbFaculty = require("../models/Faculty"),
    dbDepartment = require("../models/Department"),
    dbMajor = require("../models/Major"),
    jwt = require("jsonwebtoken");
    db = require("../models/Student")

const methods = {
    async onGetAll(req, res) {
        try {
            let result = await Service.find(req);

            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onGetById(req, res) {
        try {
            let result = await Service.findById(req.params.id);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onInsert(req, res) {
        try {
            const decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
            // console.log(decoded)
            req.body.created_by = decoded.user_id;
            //   req.body.created_by = 1;
            let result = await Service.insert(req.body);

            res.success(result, 201);
        } catch (error) {
            res.error(error);
        }
    },

    async onUpdate(req, res) {
        try {
            const decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
            req.body.updated_by = decoded.id;

            const result = await Service.update(req.params.id, req.body);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onDelete(req, res) {
        try {
            await Service.delete(req.params.id);
            res.success("success", 204);
        } catch (error) {
            res.error(error);
        }
    },

    async onRegStudentInfo(req, res) {

        const decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
        let user_id = decoded.user_id;

        try {
        let result = await Service.regStudentInfo(req.params.id);
            /* get faculty and create if not exists */
            const faculty = await facultyService.importFaculty({faculty_code:result.faculty_code, faculty_name:result.faculty_name, user_id:user_id});
            let faculty_id = faculty.faculty_id;

                /* get department and create if not exists */
            const department = await departmentService.importDepartment({department_code:result.department_code, department_name:result.department_name, faculty_id:faculty_id, user_id:user_id});
            let department_id = department.department_id;

            /* get major and create if not exists */
            const major = await majorService.importMajor({major_code:result.division_code, major_name:result.division_name, department_id:department_id, user_id:user_id});
            let major_id = major.major_id;

            result['faculty_id'] = faculty_id;
            result['department_id'] = department_id;
            result['major_id'] = major_id;

            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onImportRegStudent(req, res) {
        const decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
        let user_id = decoded.user_id;

        try {
            // let result = await Service.insertRegStudent(req.params.id);
            let result = await Service.regStudentInfo(req.params.id);

           /* get faculty and create if not exists */
            const faculty = await facultyService.importFaculty({faculty_code:result.faculty_code, faculty_name:result.faculty_name, user_id:user_id});
            let faculty_id = faculty.faculty_id;

                /* get department and create if not exists */
            const department = await departmentService.importDepartment({department_code:result.department_code, department_name:result.department_name, faculty_id:faculty_id, user_id:user_id});
            let department_id = department.department_id;

            /* get major and create if not exists */
            const major = await majorService.importMajor({major_code:result.division_code, major_name:result.division_name, department_id:department_id, user_id:user_id});
            let major_id = major.major_id;

            const studentObj = await db.findOne({
                where: { student_code : result.student_code },
            });

            result['faculty_id'] = faculty_id;
            result['department_id'] = department_id;
            result['major_id'] = major_id;

            let saveObj = null;
            if (!studentObj) {
                result['created_by'] = decoded.user_id;
                saveObj = await studentService.insert(result);
            }else{
                saveObj = await studentService.update(studentObj.student_id, result);
            }

            res.success(saveObj);
        } catch (error) {
            res.error(error);
        }
    },

    // async onInsertRegStudent(req, res) {
    //     try {
    //     let result = await Service.insertRegStudent(req.params.id);
    //         res.success(result);
    //     } catch (error) {
    //         res.error(error);
    //     }
    // },
};

module.exports = { ...methods };
