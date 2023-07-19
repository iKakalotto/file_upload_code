const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");

app.use(multer({dest: "/tmp/upload_files/"}).array("file"));

app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/index.html");
});

app.post("/upload", (req, resp) => {
    for (let i = 0; i < req.files.length; i++) {
        let utfString = Buffer.from(req.files[i].originalname, "latin1").toString("utf8");
        let newfile = `${__dirname}/files/${utfString}`;

        fs.readFile(req.files[i].path, (error, data) => {
            fs.writeFile(newfile, data, error => {
                if (error) {
                    console.error(error);
                }
            });
        });
    }

    resp.send("ok!");
});

app.listen(8080);
