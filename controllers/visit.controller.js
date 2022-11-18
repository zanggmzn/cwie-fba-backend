const Service = require("../services/visit.service"),
    jwt = require("jsonwebtoken");
const upload_folder = "visit/";
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

            if(typeof(req.files) != "undefined"){
                if (typeof(req.files['googlemap_file_upload']) != "undefined"){
                    req.body.googlemap_file = upload_folder + req.files['googlemap_file_upload'][0].filename;
                }

                if (typeof(req.files['report_file_upload']) != "undefined"){
                    req.body.report_file = upload_folder + req.files['report_file_upload'][0].filename;
                }
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

            if(typeof(req.files) != "undefined"){
                if (typeof(req.files['googlemap_file_upload']) != "undefined"){
                    req.body.googlemap_file = upload_folder + req.files['googlemap_file_upload'][0].filename;
                }

                if (typeof(req.files['report_file_upload']) != "undefined"){
                    req.body.report_file = upload_folder + req.files['report_file_upload'][0].filename;
                }
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
};

module.exports = { ...methods };
