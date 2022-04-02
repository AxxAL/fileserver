const fs = require("fs");
const util = require("./Util");
const path = require("path");

exports.GetFileList = (req, res) => {
    fs.readdir(__storagedir, (err, files) => {
        if (err) return res.status(500).send({ message: "Could not fetch list of files." });

        let fileList = [];

        files.forEach((fileName) => {
            fileList.push({
                fileName: fileName,
                fileSize: `${(util.GetFileSize(path.join(__storagedir, fileName))).toFixed(1)}mb`,
                downloadLink: `https://${req.headers.host}/dl/${fileName}`
            });
        });

        if (fileList.length == 0) return res.status(500).send({ message: "No files were found" });

        res.status(200).send({
            message: "Successfully fetched file list.",
            fileList: fileList
        });
    });
}

exports.Download = (req, res) => {
    res.download(path.join(__storagedir, req.params.fileName), (err) => {
        if (err) res.status(500).send({ message: "Could not fetch file." });
    });
}

exports.Upload = (req, res) => {
    if (!req.files) return res.status(400).send({ message: "No files provided." });

    let uploadedFile = req.files.uploadedFile;
    uploadedFile.name = uploadedFile.name.split(" ").join("-");

    uploadedFile.mv(path.join(__storagedir, uploadedFile.name), (err) => {
        if (err) return res.status(500).send({ message: "Could not upload file." });

        res.status(200).send({
            message: "File upload success.",
            fileName: uploadedFile.name,
            fileSize: uploadedFile.size,
            fileDownload: `${req.headers.host}/dl/${uploadedFile.name}`,
            md5Checksum: uploadedFile.md5
        });
    });
}