const express = require("express");
const router = express.Router();
const controller = require("./Controller");

router.get("/", (req, res) => {
    res.send({ status: "online" });
});

router.get("/dl/:fileName", controller.download);
router.get("/list", controller.getFileList);

router.use((req, res) => {
    res.redirect("/");
});

module.exports = router;