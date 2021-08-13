const fs = require("fs");
const util = require("./Util");
const path = require("path");

exports.GetFileList = (req, res) => {
    fs.readdir(__storagedir, (err, files) => {
        let fileInfos = [];

        files.forEach((fileName) => {
            const fileSize = `${(util.GetFileSize(path.join(__storagedir, fileName))).toFixed(1)}mb`;

            fileInfos.push({
                fileName: fileName,
                fileSize: fileSize,
                downloadLink: `${req.headers.host}/dl/${fileName}`
            });
        });

        res.send(fileInfos);
    });
}

exports.Download = (req, res) => {
    res.download(path.join(__storagedir, req.params.fileName), (err) => {
        if (err) res.redirect("/");
    });
}