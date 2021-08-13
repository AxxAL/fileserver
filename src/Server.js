const express = require("express");
const settings = require("./Settings");
const router = require("./Router");
const morgan = require("morgan");
const path = require("path");
const fileUpload = require("express-fileupload");
const server = express();

server.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: path.join(__rootdir, "/tmp")
}));
server.use(morgan("dev"));
server.use(router);

exports.Run = () => server.listen(settings.PORT, () => console.log(`Application is now running!\nCheck it out here: http://localhost:${settings.PORT}`));