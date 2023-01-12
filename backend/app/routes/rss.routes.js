module.exports = app => {
  const rss = require("../controllers/rss.controller.js");
  const users = require("../controllers/users.controller.js");
  var router = require("express").Router();

  router.post("/", users.verifyToken, rss.create);
  router.get("/", rss.findAll);
  router.get("/:id", rss.findOne);
  router.put("/:id", users.verifyToken, rss.update);
  router.delete("/:id", users.verifyToken, rss.delete);
  router.delete("/", users.verifyToken, rss.deleteAll);

  app.use("/api/rss", router);
};
