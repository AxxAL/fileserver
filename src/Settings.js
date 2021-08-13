require("dotenv").config();
const path = require('path');

global.__storagedir = path.join(__dirname, "..", "/files");

exports.PORT = process.env.PORT || 3000;