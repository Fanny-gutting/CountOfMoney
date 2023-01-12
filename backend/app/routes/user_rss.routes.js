module.exports = app => {
    const user_rss = require("../controllers/user_rss.controller.js");
    var router = require("express").Router();

    router.post("/", user_rss.addRss);
    router.get("/", user_rss.findAll);
    router.get("/findOne", user_rss.findOne);
    router.put("/:id", user_rss.update);
    router.delete("/delOne", user_rss.delete);
    router.delete("/delAll", user_rss.deleteAll);

    app.use("/api/users_rss", router);
};
