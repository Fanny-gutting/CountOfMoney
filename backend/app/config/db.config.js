module.exports = {
  PGHOST: "countOfMoney",
  PGUSER: "postgres",
  PGPASSWORD: "postgres",
  POSTGRES_DB: "countOfMoney",
  PGPORT: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
