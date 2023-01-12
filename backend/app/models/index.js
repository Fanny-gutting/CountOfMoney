const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users.model.js")(sequelize, Sequelize);
db.cryptos = require("./crypto.model.js")(sequelize, Sequelize);
db.user_cryptos = require("./user_crypto.model.js")(sequelize, Sequelize);
db.crypto_values = require("./crypto_value.model.js")(sequelize, Sequelize);
db.rsses = require("./rss.model.js")(sequelize, Sequelize);
db.user_rsses = require("./user_rss.model.js")(sequelize, Sequelize);
db.admin_settings = require("./admin_settings.model.js")(sequelize, Sequelize);

db.users.belongsToMany(db.cryptos, {
    through: "user_crypto",
    as: "cryptos",
    foreignKey: "users_id",
});
db.cryptos.belongsToMany(db.users, {
    through: "user_crypto",
    as: "users",
    foreignKey: "cryptos_id",
});
db.cryptos.hasMany(db.crypto_values, { as: "crypto_value" });
db.crypto_values.belongsTo(db.cryptos, {
  foreignKey: "cryptoId",
  as: "cryptos",
});
db.users.belongsToMany(db.rsses, {
    through: "user_rss",
    as: "rss",
    foreignKey: "users_id",
});
db.rsses.belongsToMany(db.users, {
    through: "user_rss",
    as: "users",
    foreignKey: "rsses_id",
});


module.exports = db;
