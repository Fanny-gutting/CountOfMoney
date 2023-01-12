module.exports = app => {
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();

    router.post("/", users.create);
    router.post("/login", users.login);
    router.get("/", users.verifyToken, users.findAll);
    router.get("/:id", users.verifyToken, users.findOne);
    router.put("/:id", users.verifyToken, users.update);
    router.delete("/:id", users.verifyToken, users.delete);
    router.delete("/", users.verifyToken, users.deleteAll);

    app.use("/api/users", router);
};
