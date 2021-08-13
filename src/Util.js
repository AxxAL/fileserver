const fs = require("fs");

exports.CheckStorageDir = () => {
    fs.access(__storagedir, (err) => {
        if (err) {
            console.log(`Storage directory not found. Creating directory [${__storagedir}]`);
            fs.mkdir(__storagedir, (err) => {
                if (err) {
                    console.error("Could not create storage directory.");
                    return;
                }
                console.log("Directory successfully created.");
            });
        }
    });
}

exports.GetFileSize = (filepath) => {
    if (!fs.existsSync(filepath)) {
        console.error(`Could not get size of ${filepath}`);
        return 0;
    }
    const stats = fs.statSync(filepath);
    return stats.size / (1024 * 1024);
}