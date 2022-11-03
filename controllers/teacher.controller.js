const Service = require("../services/teacher.service"),
    dbFaculty = require("../models/Faculty"),
    dbDepartment = require("../models/Department"),
    facultyService = require("../services/faculty.service"),
    departmentService = require("../services/department.service"),
    jwt = require("jsonwebtoken"),
    db = require("../models/Teacher");
const {
    ErrorBadRequest,
    ErrorNotFound,
    ErrorUnauthorized,
} = require("../configs/errorMethods");
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

            if (typeof(req.file) != "undefined"){
                req.body.signature_file = req.file.path;
            }

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


            if (typeof(req.file) != "undefined"){
                req.body.signature_file = req.file.path;
            }

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

    async onHrisPersonnelInfo(req, res) {
        const decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
        let user_id = decoded.user_id;

        try {
            let result = await Service.hrisPersonnelInfo({citizen_id:req.params.id});

            /* get faculty and create if not exists */
            const faculty = await facultyService.importFaculty({faculty_code:result.faculty_code, faculty_name:result.faculty_name, user_id:user_id});
            let faculty_id = faculty.faculty_id;

                /* get department and create if not exists */
            const department = await departmentService.importDepartment({department_code:result.department_code, department_name:result.department_name, faculty_id:faculty_id, user_id:user_id});
            let department_id = department.department_id;

            result['faculty_id'] = faculty_id;
            result['department_id'] = department_id;

            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onHrisFindPersonnel(req, res) {
        try {
            let result = await Service.hrisFindPersonnel(req.query);
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onHrisSyncAllTeacher(req, res) {
        const decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
        let user_id = decoded.user_id;
        try {
            // let result = await Service.hrisFindPersonnel({position_type_id : 1, person_key:2009985010791});

            /* ดึงข้อมูลสายวิชาการทั้งหมด */
            let result = await Service.hrisFindPersonnel({position_type_id : 1});
            for(var key in result) {

                let person_key = result[key]['person_key'];
                let api_updated_time = new Date(result[key]['last_updated_at']).getTime();
                let person_name = result[key]['firstname']+' '+result[key]['surname'];

                const teacherObj = await db.findOne({
                    where: { person_key : person_key },
                });

                let db_updated_time = null;
                if (teacherObj) {
                    db_updated_time = new Date(teacherObj.hris_last_updated_at).getTime();
                    if(db_updated_time === api_updated_time){
                        console.log(person_key+' '+person_name + ' up to date - continue')
                        continue;
                    }
                }

                let resultInfo = await Service.hrisPersonnelInfo({person_key:person_key});

                /* get faculty and create if not exists */
                const faculty = await facultyService.importFaculty({faculty_code:resultInfo.faculty_code, faculty_name:resultInfo.faculty_name, user_id:user_id});
                let faculty_id = faculty.faculty_id;

                 /* get department and create if not exists */
                const department = await departmentService.importDepartment({department_code:resultInfo.department_code, department_name:resultInfo.department_name, faculty_id:faculty_id, user_id:user_id});
                let department_id = department.department_id;

                // const teacherObj = await db.findOne({
                //     where: { citizen_id : resultInfo.citizen_id },
                // });

                resultInfo['person_key'] = resultInfo.person_key;
                // resultInfo['icit_account'] = resultInfo.icit_account;
                resultInfo['citizen_id'] = resultInfo.citizen_id;
                resultInfo['faculty_id'] = faculty_id;
                resultInfo['department_id'] = department_id;
                resultInfo['hris_last_updated_at'] = resultInfo.last_updated_at;

                let saveObj = null;
                if (!teacherObj) {
                    resultInfo['created_by'] = user_id;
                    saveObj = await Service.insert(resultInfo);
                    console.log("insert");
                }else{
                    if(db_updated_time !== api_updated_time){
                        saveObj = await Service.update(teacherObj.teacher_id, resultInfo);
                        console.log("Update");
                    }else{
                        console.log("Up to date");
                    }
                }
                // console.log(resultInfo);
            }
            res.success(result);
        } catch (error) {
            res.error(error);
        }
    },

    async onImportHrisPersonnel(req, res) {
        const decoded = jwt.decode(req.headers.authorization.split(" ")[1]);
        let user_id = decoded.user_id;

        try {
            const teacherObj = await db.findOne({
                where: { person_key : req.params.id },
            });

            if (teacherObj) {
                return res.error(ErrorBadRequest("Teacher already exists"));
            }

            let resultInfo = await Service.hrisPersonnelInfo({person_key:req.params.id});

           /* get faculty and create if not exists */
           const faculty = await facultyService.importFaculty({faculty_code:resultInfo.faculty_code, faculty_name:resultInfo.faculty_name, user_id:user_id});
           let faculty_id = faculty.faculty_id;

            /* get department and create if not exists */
           const department = await departmentService.importDepartment({department_code:resultInfo.department_code, department_name:resultInfo.department_name, faculty_id:faculty_id, user_id:user_id});
           let department_id = department.department_id;

           resultInfo['person_key'] = resultInfo.person_key;
           // resultInfo['icit_account'] = resultInfo.icit_account;
           resultInfo['citizen_id'] = resultInfo.citizen_id;
           resultInfo['faculty_id'] = faculty_id;
           resultInfo['department_id'] = department_id;
           resultInfo['hris_last_updated_at'] = resultInfo.last_updated_at;

           let saveObj = null;
           if (!teacherObj) {
               resultInfo['created_by'] = user_id;
               saveObj = await Service.insert(resultInfo);
           }
           res.success(saveObj);
        } catch (error) {
            res.error(error);
        }
    }
};

module.exports = { ...methods };
