const express = require("express");
const settings = require("./Settings");
const router = require("./Router");
const morgan = require("morgan");
const server = express();

server.use(morgan("dev"));
server.use(router);

exports.Run = () => server.listen(settings.PORT, () => console.log(`Application is now running!\nCheck it out here: http://localhost:${settings.PORT}`));