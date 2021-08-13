const express = require("express");
const router = express.Router();
const controller = require("./Controller");

router.get("/", (req, res) => {
    res.send({ status: "online" });
});

router.get("/dl/:fileName", controller.Download);
router.get("/list", controller.GetFileList);

router.use((req, res) => {
    res.redirect("/");
});

module.exports = router;