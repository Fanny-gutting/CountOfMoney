module.exports = app => {
    const crypto_values = require("../controllers/crypto_value.controller.js");
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();

    router.post("/", users.verifyToken, crypto_values.create);
    router.get("/", crypto_values.findAll);
    router.get("/CryptoValue/:id", crypto_values.getValueByCryptoId);
    router.put("/:id", users.verifyToken, crypto_values.update);
    router.delete("/:id", users.verifyToken, crypto_values.delete);
    router.delete("/CryptoId/:id", users.verifyToken, crypto_values.deleteByCrypto);
    router.delete("/", users.verifyToken, crypto_values.deleteAll);

    app.use("/api/crypto_value", router);
};