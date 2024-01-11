const ogms = {
    databse: "ogms",
    password: "",
    user: "root",
    config: {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
      logging: false,
      charset: "utf8",
      collate: "utf8_general_ci",
      dialectOptions: {
        timezone: "local",
        dateStrings: true,
        typeCast: true,
      },
    }
  }

module.exports = {
    ogms
  };