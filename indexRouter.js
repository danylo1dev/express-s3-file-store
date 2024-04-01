const express = require("express");
const router = express.Router();
const controller = require("./s3/s3.controller");

router.post("/get-put-link", controller.getPutLink);
router.post("/finalize-upload", controller.finalizeUpload);

module.exports = router;
