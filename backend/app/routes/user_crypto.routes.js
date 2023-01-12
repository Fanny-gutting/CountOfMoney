module.exports = app => {
    const user_crypto = require("../controllers/user_crypto.controller.js");
    var router = require("express").Router();

    router.post("/", user_crypto.addCrypto);
    router.get("/", user_crypto.findAll);
    router.get("/findOne", user_crypto.findOne);
    router.put("/:id", user_crypto.update);
    router.delete("/delOne", user_crypto.delete);
    router.delete("/delAll", user_crypto.deleteAll);

    app.use("/api/users_crypto", router);
};
