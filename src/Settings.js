require("dotenv").config();
const path = require('path');

global.__rootdir = path.join(__dirname, "..");
global.__storagedir = path.join(__rootdir, "/files");

exports.PORT = process.env.PORT || 3000;