module.exports = app => {
  const cryptos = require("../controllers/crypto.controller.js");
  const users = require("../controllers/users.controller.js");
  var router = require("express").Router();

  router.post("/", users.verifyToken, cryptos.create);
  router.get("/", cryptos.findAll);
  router.get("/FindPopCrypto", cryptos.FindPopCrypto);
  router.get("/:id", cryptos.findOne);
  router.put("/:id", users.verifyToken, cryptos.update);
  router.delete("/:id", users.verifyToken, cryptos.delete);
  router.delete("/", users.verifyToken, cryptos.deleteAll);

  app.use("/api/cryptos", router);
};
