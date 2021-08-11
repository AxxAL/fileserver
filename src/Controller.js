const fs = require("fs");
const util = require("./Util");
const path = require("path");

function getFileList(req, res) {
    fs.readdir(__storagedir, (err, files) => {
        let fileInfos = [];

        files.forEach((fileName) => {
            const fileSize = `${(util.GetFileSize(path.join(__storagedir, fileName)) / (1024 * 1024)).toFixed(1)}mb`;

            fileInfos.push({
                fileName: fileName,
                fileSize: fileSize,
                downloadLink: `${req.headers.host}/dl/${fileName}`
            });
        });

        res.send(fileInfos);
    });
}

function download(req, res) {
    const fileName = req.params.fileName;
    res.download(path.join(__storagedir, fileName), (err) => { if (err) res.redirect("/") });
}

module.exports = {
    download,
    getFileList
}