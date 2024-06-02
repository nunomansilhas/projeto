module.exports = app => {
    const loginController = require("../controllers/login.controller.js");

    var router = require("express").Router();

    // Define login route
    router.post("/", loginController.login);

    // Define logout route
    router.post("/logout", loginController.logout);

    app.use('/api/login', router);
};
