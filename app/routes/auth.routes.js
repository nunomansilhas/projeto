module.exports = app => {
    const auth = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    router.post("/", auth.login);

    app.use('/api/login', router);
};