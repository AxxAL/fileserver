const express = require("express");
const router = express.Router();
const controller = require("./Controller");

router.get("/", (req, res) => {
    res.send({ status: "Online!" });
});

router.get("/files/:fileName", controller.download);
router.get("/files", controller.getFileList);

router.use((req, res) => {
    res.status(404).send("Nothing here... :\\");
});

module.exports = router;