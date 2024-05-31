module.exports = app => {
    const upload = require("../controllers/upload.controller.js");
    const multer = require('multer');

    // Configure multer for file uploads
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'img/');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const uploadMiddleware = multer({ storage: storage });

    var router = require("express").Router();

    // Upload image
    router.post("/", uploadMiddleware.single('img'), upload.uploadImage);

    app.use('/api/upload', router);
};
