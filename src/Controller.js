const fs = require("fs");
const filesPath = __rootdir + "/uploads/";

function getFileSize(file) {
    fs.stat(filesPath + file, (err, stats) => {
        if (err) {
            console.log(`Error! ${err}`);
            return null;
        }

        return stats;
    });
}

function getFileList(req, res) {

    fs.readdir(filesPath, (err, files) => {
        if (err) {
            res.status(500).send({ message: "Error! Could not find files." });
            return;
        } 

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                fileName: file
            });
        });
        
        res.send(fileInfos);
    });
}

function download(req, res) {
    const fileName = req.params.fileName;

    res.download(filesPath + fileName, fileName, err => {
        if (err) res.status(500).send({ message: `Error! Could not find ${fileName}.` });
    });
}

module.exports = {
    download,
    getFileList
}