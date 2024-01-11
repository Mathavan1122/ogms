const dbinfo = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbinfo.ogms.databse,
    dbinfo.ogms.user,
    dbinfo.ogms.password,
  { ...dbinfo.ogms.config }
);
const databse = {};

databse.Sequelize = Sequelize;
databse.sequelize = sequelize;

databse.users = require("./user.model.js")(sequelize, Sequelize);
databse.products = require("./product.model.js")(sequelize, Sequelize);
databse.transaction = require("./transaction.model.js")(sequelize, Sequelize);

module.exports = databse;