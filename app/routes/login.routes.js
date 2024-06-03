module.exports = app => {
    const loginController = require("../controllers/login.controller.js");
    const authMiddleware = require("../middleware/auth");
    var router = require("express").Router();

    router.post("/", loginController.login);

    router.get("/", authMiddleware, (req, res) => {
        res.status(200).send({ user: req.session.user });
    });

    router.post("/logout", loginController.logout);

    app.use('/api/login', router);
};
