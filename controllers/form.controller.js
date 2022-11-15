const Service = require("../services/form.service"),
companyService = require("../services/company.service"),
    jwt = require("jsonwebtoken");

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
                if (typeof(req.files['response_document_file_upload']) != "undefined"){
                    req.body.response_document_file = req.files['response_document_file_upload'][0].path;
                }

                if (typeof(req.files['workplace_googlemap_file_upload']) != "undefined"){
                    req.body.workplace_googlemap_file = req.files['workplace_googlemap_file_upload'][0].path;
                }

                if (typeof(req.files['plan_document_file_upload']) != "undefined"){
                    req.body.plan_document_file = req.files['plan_document_file_upload'][0].path;
                }

                if (typeof(req.files['namecard_file_upload']) != "undefined"){
                    req.body.namecard_file = req.files['namecard_file_upload'][0].path;
                }
            }

            if (typeof(req.body.company_id) === "undefined"){

                if(typeof(req.body.company) !== "undefined"){
                    let company = JSON.parse(req.body.company);
                    company.created_by = decoded.user_id;

                    const companyObj = await companyService.importCompany(company);
                    let company_id = companyObj.company_id;
                    req.body.company_id = company_id;
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
            req.body.updated_by = decoded.user_id;

            if(typeof(req.files) != "undefined"){
                if (typeof(req.files['response_document_file_upload']) != "undefined"){
                    req.body.response_document_file = req.files['response_document_file_upload'][0].path;
                }

                if (typeof(req.files['workplace_googlemap_file_upload']) != "undefined"){
                    req.body.workplace_googlemap_file = req.files['workplace_googlemap_file_upload'][0].path;
                }

                if (typeof(req.files['plan_document_file_upload']) != "undefined"){
                    req.body.plan_document_file = req.files['plan_document_file_upload'][0].path;
                }

                if (typeof(req.files['namecard_file_upload']) != "undefined"){
                    req.body.namecard_file = req.files['namecard_file_upload'][0].path;
                }
            }

            if (typeof(req.body.company_id) === "undefined"){

                if(typeof(req.body.company) !== "undefined"){
                    let company = JSON.parse(req.body.company);
                    company.created_by = decoded.user_id;

                    const companyObj = await companyService.importCompany(company);
                    let company_id = companyObj.company_id;
                    req.body.company_id = company_id;
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
