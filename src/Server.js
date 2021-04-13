const express = require("express");
const server = express();
const settings = require("./Settings");
const router = require("./Router");
const morgan = require("morgan");

server.use(morgan("dev"));
server.use(router, () => console.log(`Registered routes! ${router}`) );

function start() {
    server.listen(settings.PORT, () => console.log(`Application running @ http://localhost:${settings.PORT}`) );
}

module.exports = {
    start: start
}