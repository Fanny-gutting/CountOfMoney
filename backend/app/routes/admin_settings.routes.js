module.exports = app => {
    const admin_settings = require("../controllers/admin_settings.controller.js");
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();

    router.post("/", users.verifyToken, admin_settings.create);
    router.get("/", admin_settings.findAll);
    router.put("/:id", users.verifyToken, admin_settings.update);
    router.delete("/:id", users.verifyToken, admin_settings.delete);
    router.delete("/", users.verifyToken, admin_settings.deleteAll);

    app.use("/api/admin_settings", router);
};
